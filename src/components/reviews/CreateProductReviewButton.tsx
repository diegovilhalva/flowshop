"use client";

import { members } from "@wix/members";
import { products } from "@wix/stores";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import CreateProductReviewDialog from "./CreateProductReviewDialog";

interface CreateProductReviewButtonProps {
    product: products.Product;
    loggedInMember: members.Member | null;
    hasExistingReview: boolean;
}

export default function CreateProductReviewButton({
    product,
    loggedInMember,
    hasExistingReview,
}: CreateProductReviewButtonProps) {
    const searchParams = useSearchParams();

    const [showReviewDialog, setShowReviewDialog] = useState(
        searchParams.has("createReview"),
    );

    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

    return (
        <>
            <Button
                onClick={() => setShowReviewDialog(true)}
                disabled={!loggedInMember}
            >
                {loggedInMember ? "Escrever uma avaliação" : "Faça login para escrever uma avaliação"}
            </Button>
            <CreateProductReviewDialog
                product={product}
                open={showReviewDialog && !hasExistingReview && !!loggedInMember}
                onOpenChange={setShowReviewDialog}
                onSubmitted={() => {
                    setShowReviewDialog(false);
                    setShowConfirmationDialog(true);
                }}
            />
            <ReviewSubmittedDialog
                open={showConfirmationDialog}
                onOpenChange={setShowConfirmationDialog}
            />
            <ReviewAlreadyExistsDialog
                open={showReviewDialog && hasExistingReview}
                onOpenChange={setShowReviewDialog}
            />
        </>
    );
}

interface ReviewSubmittedDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

function ReviewSubmittedDialog({
    open,
    onOpenChange,
}: ReviewSubmittedDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Obrigado pela sua avaliação!</DialogTitle>
                <DialogDescription>
                    Sua avaliação foi enviada com sucesso. Ela será visível assim que for aprovada por nossa equipe.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button onClick={() => onOpenChange(false)}>Fechar</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    
    );
}

interface ReviewAlreadyExistsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

function ReviewAlreadyExistsDialog({
    open,
    onOpenChange,
}: ReviewAlreadyExistsDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Avaliação já existe</DialogTitle>
                    <DialogDescription>
                        Você já escreveu uma avaliação para este produto. É permitido escrever apenas uma avaliação por produto.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={() => onOpenChange(false)}>Fechar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}