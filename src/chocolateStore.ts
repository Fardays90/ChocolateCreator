import { create } from 'zustand';

type storeProps = {
    flavor: string,
    shape: string,
    toppings: string | null,
    changeToppings: (topping: string) => void,
    changeFlavor: (flavor: string) => void,
    changeShape: (shape: string) => void,
}

const useChocolateStore = create<storeProps>((set) => ({
    flavor:'Milk',
    shape:'Rectangle',
    toppings: null,
    changeFlavor: (flavor: string) => {
        return set((state) => ({...state, flavor:flavor}))
    },
    changeShape: (shape: string) => {
        return set((state) => ({...state, shape:shape}))
    },
    changeToppings: (topping: string) => {
        return set((state) => ({...state, toppings:topping}))
    },
}))

export { useChocolateStore }