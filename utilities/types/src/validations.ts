export type AssertNoForeignProps<TRestProps extends TBase, TBase, TExtra = {}> =
    {} extends Omit<Required<TRestProps>, keyof TBase | keyof TExtra>
    ? unknown
    : never
