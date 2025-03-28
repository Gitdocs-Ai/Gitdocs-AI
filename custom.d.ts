declare module "tailwindcss/lib/util/flattenColorPalette.js" {
    type Colors = Record<string, string | Record<string, string>>;

    /**
     * Flattens a nested color palette object into a single-level object.
     * @param colors - The nested color palette to flatten.
     * @returns A flattened color palette.
     */
    const flattenColorPalette: (colors: Colors) => Record<string, string>;

    export default flattenColorPalette;
}
