"use client";

import React from "react";

// ShadCn
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Components
import { BaseButton } from "@/app/components";

// Icons
import { Percent, RefreshCw } from "lucide-react";

// Types
import { ControlType, NameType } from "@/app/types/types";

type ChargeInputProps = {
    label: string;
    control: ControlType;
    name: NameType;
    switchAmountType: (
        type: string,
        setType: React.Dispatch<React.SetStateAction<string>>
    ) => void;
    type: string;
    setType: React.Dispatch<React.SetStateAction<string>>;
    currency: string;
};

const ChargeInput = ({
    label,
    control,
    name,
    switchAmountType,
    type,
    setType,
    currency,
}: ChargeInputProps) => {
    return (
        <>
            <div className="flex justify-between items-center">
                <div>{label}</div>

                <div className="flex items-center gap-1">
                    <BaseButton
                        variant="ghost"
                        size="icon"
                        onClick={() => switchAmountType(type, setType)}
                    >
                        <RefreshCw />
                    </BaseButton>

                    <FormField
                        control={control}
                        name={name}
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex justify-between items-center text-sm">
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="w-[7rem]"
                                            placeholder={label}
                                            type="number"
                                            min="0"
                                            max="1000000"
                                        />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />
                    {type == "percentage" ? <Percent /> : <div>{currency}</div>}
                </div>
            </div>
        </>
    );
};

export default ChargeInput;
