import { createContext } from "react";

// To avoid prop drilling `allowAddPeriod` to `ScheduleRow` component
// eslint-disable-next-line @bigbinary/neeto/use-zustand-for-global-state-management
const CartItemsContext = createContext([]);

export default CartItemsContext;
