"use client";

import { useEffect, useRef, useState } from "react";

// RHF
import { useFormContext, useWatch } from "react-hook-form";

// ShadCn
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

// Components
import {
    DrawSignature,
    TypeSignature,
    UploadSignature,
} from "@/app/components";

// Contexts
import { useTranslationContext } from "@/app/contexts/TranslationContext";

// Icons
import { FileSignature } from "lucide-react";

// Hooks
import { useSignature } from "@/app/hooks/useSignature";

// Helpers
import { isDataUrl } from "@/lib/helpers";

// Types
import { SignatureTabs } from "@/app/types/types";

type SignatureModalProps = {};

const SignatureModal = ({}: SignatureModalProps) => {
    const { setValue } = useFormContext();

    const { _t } = useTranslationContext();

    // Modal state
    const [open, setOpen] = useState(false);

    // Modal tabs
    const [tab, setTab] = useState<string>(SignatureTabs.DRAW);

    const onTabChange = (value: string) => {
        setTab(value as string);
    };

    // Signature variables
    const {
        signatureData,
        signatureRef,
        colors,
        selectedColor,
        handleColorButtonClick,
        clearSignature,
        handleCanvasEnd,
        typedSignature,
        setTypedSignature,
        typedSignatureFonts,
        selectedFont,
        setSelectedFont,
        typedSignatureFontSize,
        uploadSignatureRef,
        uploadSignatureImg,
        handleUploadSignatureChange,
        handleRemoveUploadedSignature,
    } = useSignature();

    const signature = useWatch({
        name: "details.signature.data",
    });

    const typedSignatureRef = useRef<HTMLInputElement | null>(null);

    /**
     * Function that handles signature save logic for all tabs (draw, type, upload)
     */
    const handleSaveSignature = () => {
        if (tab == SignatureTabs.DRAW) {
            handleCanvasEnd();

            // This setValue was removed from handleCanvasEnd and put here to prevent
            // the signature from showing updated drawing every time drawing stops
            setValue("details.signature.data", signatureData, {
                shouldDirty: true,
            });

            setOpen(false);
        }

        if (tab == SignatureTabs.TYPE) {
            setValue(
                "details.signature",
                {
                    data: typedSignature,
                    fontFamily: selectedFont.name,
                },
                {
                    shouldDirty: true,
                }
            );

            setOpen(false);
        }

        if (tab == SignatureTabs.UPLOAD) {
            setValue("details.signature.data", uploadSignatureImg, {
                shouldDirty: true,
            });
            setOpen(false);
        }
    };

    // When opening modal or switching tabs, apply signatureData to the canvas when it's available
    // Persists the signature
    useEffect(() => {
        if (open && signatureData) {
            // Access the canvas element and draw the signature
            setTimeout(() => {
                const canvas = signatureRef.current;
                if (canvas) {
                    canvas.fromDataURL(signatureData);
                }
            }, 50);
        }
    }, [open, tab]);

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="flex justify-start">
                    <div>
                        <Label>
                            {_t("form.steps.summary.signature.heading")}
                        </Label>

                        {signature && isDataUrl(signature) ? (
                            <img
                                className="border border-black rounded-md hover:border-blue-500 bg-white"
                                src={signature}
                                width={300}
                                alt=""
                            />
                        ) : signature && typedSignature ? (
                            <div className="flex justify-center items-center w-[300px]">
                                <p
                                    style={{
                                        fontFamily: selectedFont.variable,
                                        fontSize: 55,
                                    }}
                                >
                                    {signature}
                                </p>
                            </div>
                        ) : (
                            <div
                                style={{
                                    width: "300px",
                                }}
                                className="signature-upload flex flex-col justify-center items-center h-[155px] border border-black rounded-md hover:border-blue-500"
                            >
                                <FileSignature />
                                <Label>
                                    {_t(
                                        "form.steps.summary.signature.placeholder"
                                    )}
                                </Label>
                            </div>
                        )}
                    </div>
                </DialogTrigger>

                <DialogContent className="select-none">
                    <DialogTitle>
                        {_t("form.steps.summary.signature.heading")}
                    </DialogTitle>

                    <Tabs value={tab} onValueChange={onTabChange}>
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value={SignatureTabs.DRAW}>
                                {_t("form.steps.summary.signature.draw")}
                            </TabsTrigger>
                            <TabsTrigger value={SignatureTabs.TYPE}>
                                {_t("form.steps.summary.signature.type")}
                            </TabsTrigger>
                            <TabsTrigger value={SignatureTabs.UPLOAD}>
                                {_t("form.steps.summary.signature.upload")}
                            </TabsTrigger>
                        </TabsList>

                        {/* DRAW */}
                        <DrawSignature
                            signatureData={signatureData}
                            signatureRef={signatureRef}
                            colors={colors}
                            selectedColor={selectedColor}
                            handleColorButtonClick={handleColorButtonClick}
                            clearSignature={clearSignature}
                            handleCanvasEnd={handleCanvasEnd}
                            handleSaveSignature={handleSaveSignature}
                        />

                        {/* TYPE */}
                        <TypeSignature
                            typedSignatureFontSize={typedSignatureFontSize}
                            selectedFont={selectedFont}
                            setSelectedFont={setSelectedFont}
                            typedSignature={typedSignature}
                            setTypedSignature={setTypedSignature}
                            typedSignatureFonts={typedSignatureFonts}
                            handleSaveSignature={handleSaveSignature}
                            inputRef={typedSignatureRef}
                        />

                        {/* UPLOAD */}
                        <UploadSignature
                            uploadSignatureRef={uploadSignatureRef}
                            uploadSignatureImg={uploadSignatureImg}
                            handleUploadSignatureChange={
                                handleUploadSignatureChange
                            }
                            handleRemoveUpload={handleRemoveUploadedSignature}
                            handleSaveSignature={handleSaveSignature}
                        />
                    </Tabs>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SignatureModal;
