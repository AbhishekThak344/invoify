import numberToWords from "number-to-words";

/**
 * Formats a number with commas and decimal places
 *
 * @param number Number to format
 * @returns A styled number to be displayed on the invoice
 */
const formatNumberWithCommas = (number: number) => {
    return number.toLocaleString("en-US", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

/**
 * Turns a number into words for invoices
 *
 * @param price Number to format
 * @returns Number in words
 */
const formatPriceToString = (price: number): string => {
    // Split the price into integer and fractional parts (Dollar and Cents)
    const integerPart = Math.floor(price);
    const fractionalPart = Math.round((price - integerPart) * 100);

    // Convert the integer part to words with capitalized first letter
    const integerPartInWords = numberToWords
        .toWords(integerPart)
        .replace(/^\w/, (c) => c.toUpperCase());

    // Create the result string without fractional part if it's zero
    let result = integerPartInWords;

    // Append fractional part only if it's not zero
    if (fractionalPart !== 0) {
        result += ` and ${fractionalPart}/100`;
    }

    // Handle the case when both integer and fractional parts are zero
    if (integerPart === 0 && fractionalPart === 0) {
        return "Zero";
    }

    return result;
};

/**
 * This method flattens a nested object. It is used for xlsx export
 * @param obj A nested object to flatten
 * @param parentKey The parent key
 * @returns A flattened object
 */
const flattenObject = <T>(
    obj: Record<string, T>,
    parentKey = ""
): Record<string, T> => {
    const result: Record<string, T> = {};

    for (const key in obj) {
        if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
            const flattened = flattenObject(
                obj[key] as Record<string, T>,
                parentKey + key + "_"
            );
            for (const subKey in flattened) {
                result[parentKey + subKey] = flattened[subKey];
            }
        } else {
            result[parentKey + key] = obj[key];
        }
    }

    return result;
};

/**
 * A method to validate an email address
 *
 * @param email Email to validate
 * @returns A boolean indicating if the email is valid
 */
const isValidEmail = (email: string) => {
    // Regular expression for a simple email pattern
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
};

/**
 * A method to check if a string is a data URL
 * @param str String to check
 * @returns Boolean indicating if the string is a data URL
 */
const isDataUrl = (str: string) => str.startsWith("data:");

export {
    formatNumberWithCommas,
    formatPriceToString,
    flattenObject,
    isValidEmail,
    isDataUrl,
};
