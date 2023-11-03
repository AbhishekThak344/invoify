"use client";

import React, { useEffect } from "react";

// RHF
import { useFormContext, useWatch } from "react-hook-form";

// ShadCn
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Components
import { BaseButton, FormInput, FormTextarea } from "@/app/components";

// Contexts
import { useTranslationContext } from "@/app/contexts/TranslationContext";

// Icons
import { Trash2 } from "lucide-react";

// Types
import { NameType } from "@/app/types/types";

type SingleItemProps = {
    name: NameType;
    index: number;
    removeField: (index: number) => void;
};

const SingleItem = ({ name, index, removeField }: SingleItemProps) => {
    const { control, setValue } = useFormContext();

    const { _t } = useTranslationContext();

    // Get rate variable
    const rate = useWatch({
        name: `${name}[${index}].unitPrice`,
        control,
    });

    // Get quantity variable
    const quantity = useWatch({
        name: `${name}[${index}].quantity`,
        control,
    });

    // Get currency variable
    const currency = useWatch({
        name: `details.currency`,
        control,
    });

    // Get currency variable
    const total = useWatch({
        name: `${name}[${index}].total`,
        control,
    });

    useEffect(() => {
        // Calculate total when rate or quantity changes
        if (rate != undefined && quantity != undefined) {
            const calculatedTotal = (rate * quantity).toFixed(2);
            setValue(`${name}[${index}].total`, calculatedTotal);
        }
    }, [rate, quantity]);

    return (
        <div className="flex flex-col gap-y-5 my-2">
            {_t("form.steps.lineItems.item")} #{index + 1}
            <div className="flex flex-wrap gap-x-10 gap-y-5" key={index}>
                <FormInput
                    name={`${name}[${index}].name`}
                    label={_t("form.steps.lineItems.name")}
                    placeholder="Item name"
                    vertical
                />

                <FormInput
                    name={`${name}[${index}].quantity`}
                    type="number"
                    label={_t("form.steps.lineItems.quantity")}
                    placeholder={_t("form.steps.lineItems.quantity")}
                    className="w-[8rem]"
                    vertical
                />

                <FormInput
                    name={`${name}[${index}].unitPrice`}
                    type="number"
                    label={_t("form.steps.lineItems.rate")}
                    labelHelper={`(${currency})`}
                    placeholder={_t("form.steps.lineItems.rate")}
                    className="w-[8rem]"
                    vertical
                />

                <div className="flex flex-col gap-2">
                    <div>
                        <Label>{_t("form.steps.lineItems.total")}</Label>
                    </div>
                    <Input
                        value={`${total} ${currency}`}
                        readOnly
                        placeholder="Item total"
                        className="border-none font-medium text-lg"
                        size={10}
                    />
                </div>
            </div>
            <FormTextarea
                name={`${name}[${index}].description`}
                label={_t("form.steps.lineItems.description")}
                placeholder="Item description"
            />
            <div>
                {/* Not allowing deletion for first item and making sure that there is always at least 1 item */}
                {index != 0 && (
                    <BaseButton
                        variant="destructive"
                        className="w-fit gap-2"
                        onClick={() => removeField(index)}
                    >
                        <Trash2 />
                        {_t("form.steps.lineItems.removeItem")}
                    </BaseButton>
                )}
            </div>
            <hr />
        </div>
    );
};

export default SingleItem;
