"use client";

// RHF
import { useFieldArray, useFormContext } from "react-hook-form";

// ShadCn
import { Label } from "@/components/ui/label";

// Components
import { BaseButton, FormCustomInput, FormInput } from "@/app/components";

// Contexts
import { useTranslationContext } from "@/app/contexts/TranslationContext";

// Icons
import { Plus } from "lucide-react";

type BillToSectionProps = {};

const BillToSection = ({}: BillToSectionProps) => {
    const { control } = useFormContext();

    const { _t } = useTranslationContext();

    const CUSTOM_INPUT_NAME = "receiver.customInputs";

    const { fields, append, remove } = useFieldArray({
        control: control,
        name: CUSTOM_INPUT_NAME,
    });

    const addNewCustomInput = () => {
        append({
            key: "",
            value: "",
        });
    };

    const removeCustomInput = (index: number) => {
        remove(index);
    };

    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="billTo" className="text-xl font-semibold">
                {_t("form.steps.fromAndTo.billTo")}:
            </Label>

            <FormInput
                name="receiver.name"
                label={_t("form.steps.fromAndTo.name")}
                placeholder="Receiver name"
            />
            <FormInput
                name="receiver.address"
                label={_t("form.steps.fromAndTo.address")}
                placeholder="Receiver address"
            />
            <FormInput
                name="receiver.zipCode"
                label={_t("form.steps.fromAndTo.zipCode")}
                placeholder="Receiver zip code"
            />
            <FormInput
                name="receiver.city"
                label={_t("form.steps.fromAndTo.city")}
                placeholder="Receiver city"
            />
            <FormInput
                name="receiver.country"
                label={_t("form.steps.fromAndTo.country")}
                placeholder="Receiver country"
            />
            <FormInput
                name="receiver.email"
                label={_t("form.steps.fromAndTo.email")}
                placeholder="Receiver email"
            />
            <FormInput
                name="receiver.phone"
                label={_t("form.steps.fromAndTo.phone")}
                placeholder="Receiver phone number"
            />

            {/* //? key = field.id fixes a bug where wrong field gets deleted  */}
            {fields?.map((field, index) => (
                <FormCustomInput
                    key={field.id}
                    index={index}
                    location={CUSTOM_INPUT_NAME}
                    removeField={removeCustomInput}
                />
            ))}

            <BaseButton
                tooltipLabel="Add custom input to receiver"
                size="sm"
                variant="link"
                className="w-fit"
                onClick={addNewCustomInput}
            >
                <Plus />
                {_t("form.steps.fromAndTo.addCustomInput")}
            </BaseButton>
        </div>
    );
};

export default BillToSection;
