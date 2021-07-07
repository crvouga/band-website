import { commerce } from "@data-access";
import { indexBy, usePersistedState } from "@utility";
import {
  ILineItem,
  ILineItemUpdate,
  updateLineItems,
} from "data-access/commerce";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDebounce, useDebouncedCallback } from "use-debounce/lib";

const useCartId = () => {
  return usePersistedState<string | null>("THE_BAND_ALIBI_CART_ID", null);
};

const toCartKey = ({ cartId }: { cartId?: string | null }) => {
  return ["cart", cartId ?? ""].join("/");
};

export const useCartQuery = () => {
  const [cartId, setCartId] = useCartId();

  return useQuery(toCartKey({ cartId }), async () => {
    if (cartId) {
      return commerce.cart.get(cartId);
    }

    const cart = await commerce.cart.create();

    setCartId(cart.cartId);

    return cart;
  });
};

export const useAddCartItems = () => {
  const cartQuery = useCartQuery();
  const queryClient = useQueryClient();

  type IVariables = Parameters<typeof commerce.cart.add>[1];

  return useMutation({
    mutationFn: async (variables: IVariables) => {
      if (!cartQuery.data) {
        return null;
      }

      return commerce.cart.add(cartQuery.data.cartId, variables);
    },

    onSuccess: (nextCart) => {
      if (!nextCart) {
        return;
      }

      queryClient.setQueryData(
        toCartKey({ cartId: nextCart.cartId }),
        nextCart
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries(
        toCartKey({ cartId: cartQuery.data?.cartId })
      );
    },
  });
};

export const useRemoveCartItems = () => {
  const cartQuery = useCartQuery();
  const queryClient = useQueryClient();

  type IVariables = Parameters<typeof commerce.cart.remove>[1];

  return useMutation({
    mutationFn: async (variables: IVariables) => {
      if (!cartQuery.data) {
        return null;
      }

      return commerce.cart.remove(cartQuery.data.cartId, variables);
    },

    onSuccess: (nextCart) => {
      if (!nextCart) {
        return;
      }

      queryClient.setQueryData(
        toCartKey({ cartId: nextCart.cartId }),
        nextCart
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries(
        toCartKey({ cartId: cartQuery.data?.cartId })
      );
    },
  });
};

export const useUpdateCartItems = () => {
  const cartQuery = useCartQuery();
  const queryClient = useQueryClient();
  const [batch, setBatch] = useState<{ [id: string]: ILineItemUpdate }>({});

  const mutation = useMutation({
    mutationFn: async (lineItemUpdates: ILineItemUpdate[]) => {
      const cart = cartQuery.data;

      if (!cart) {
        return null;
      }

      const nextCart = await commerce.cart.update(cart.cartId, lineItemUpdates);

      return nextCart;
    },

    onSettled: () => {
      const cart = cartQuery.data;

      if (!cart) {
        return;
      }

      const queryKey = toCartKey({ cartId: cart.cartId });

      queryClient.invalidateQueries(queryKey);
    },
  });

  const optimisticUpdate = (lineItemUpdates: ILineItemUpdate[]) => {
    const cart = cartQuery.data;

    if (!cart) {
      return;
    }

    const queryKey = toCartKey({ cartId: cart.cartId });

    const optimistic = updateLineItems(cart, lineItemUpdates);

    queryClient.setQueryData(queryKey, optimistic);
  };

  const mutate = async (updates: ILineItemUpdate[]) => {
    optimisticUpdate(updates);

    setBatch((batch) => ({
      ...batch,
      ...indexBy((update) => update.lineItemId, updates),
    }));
  };

  const [batchDebounced] = useDebounce(batch, 1000);

  const updates = Object.values(batchDebounced);

  const mutationKey = updates
    .map((update) => [update.lineItemId, update.quantity].join(" "))
    .join(" ");

  useEffect(() => {
    if (updates.length > 0) {
      mutation.mutateAsync(updates);
    }
  }, [mutationKey]);

  return {
    variables: mutation.status,
    status: mutation.status,
    mutate,
  };
};
