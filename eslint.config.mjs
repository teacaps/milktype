import hydrogen from "eslint-plugin-hydrogen";

export default [
    hydrogen.configs.recommended,
    hydrogen.configs.typescript,
    {
    ignores: ["**/build", "**/node_modules", "**/bin", "**/*.d.ts", "**/dist"],
}, {
    rules: {
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/naming-convention": "off",
        "hydrogen/prefer-image-component": "off",
        "no-useless-escape": "off",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
        "no-case-declarations": "off",
        "no-console": "off",
        "eslint-comments/no-unlimited-disable": "off",
    },
}];
