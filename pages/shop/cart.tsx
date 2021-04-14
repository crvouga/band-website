import { GetStaticProps } from "next";
import { IShopCartProps, ShopCart } from "../../components/shop/shop.cart";
import { dataStore } from "../../lib/data-access";

export const getStaticProps: GetStaticProps<IShopCartProps> = async () => {
  return {
    props: {
      settings: await dataStore.settings.get(),
    },
  };
};

export default ShopCart;