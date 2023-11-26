"use client";

// ShadCn
import { Label } from "@/components/ui/label";

// Contexts
import { useTranslationContext } from "@/app/contexts/TranslationContext";

// Components
import { FormInput } from "@/app/components";

type PaymentInformationProps = {};

const PaymentInformation = ({}: PaymentInformationProps) => {
    const { _t } = useTranslationContext();
    return (
        <>
            <Label className="text-xl font-semibold">
                {_t("form.steps.paymentInfo.heading")}:
            </Label>
            <div className="flex flex-wrap gap-10 mt-5">
                <FormInput
                    name="details.paymentInformation.bankName"
                    label={_t("form.steps.paymentInfo.bankName")}
                    placeholder={_t("form.steps.paymentInfo.bankName")}
                    vertical
                />
                <FormInput
                    name="details.paymentInformation.accountName"
                    label={_t("form.steps.paymentInfo.accountName")}
                    placeholder={_t("form.steps.paymentInfo.accountName")}
                    vertical
                />
                <FormInput
                    name="details.paymentInformation.accountNumber"
                    label={_t("form.steps.paymentInfo.accountNumber")}
                    placeholder={_t("form.steps.paymentInfo.accountNumber")}
                    vertical
                />
            </div>
        </>
    );
};

export default PaymentInformation;
