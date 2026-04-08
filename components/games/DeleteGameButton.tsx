"use client";

import { useState, useTransition } from "react";
import { createPortal }            from "react-dom";
import { deleteGame }              from "@/app/actions/game-actions";
import { useRouter }               from "next/navigation";
import TrashIconCustom             from "../icons/TrashIcon";

export default function DeleteGameButton({ game }: { game: { id: number; title: string } }) {
    const [isOpen, setIsOpen]          = useState(false);
    const [isPending, startTransition] = useTransition();
    const router                       = useRouter();
    const [showToast, setShowToast]    = useState(false);

    const handleDelete = () => {
        startTransition(async () => {
            await deleteGame(game.id);
            setIsOpen(false);
            setShowToast(true);
            setTimeout(() => {
                 setShowToast(false);
                  router.refresh();
              }, 3000);
            
        });
    };

    const modal = (
        <div
            style={{ position: "fixed", inset: 0}}
            className="inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={(e) => { if (e.target === e.currentTarget && !isPending) setIsOpen(false); }}
        >
            <div className="bg-base-100 rounded-2xl p-8 w-full max-w-md mx-4">
                <p className="font-bold text-xl">
                    Are you sure ?
                </p>
                <p className="text-base text-base-content/80 mb-6">
                     you want to delete{" "}
                    <span className="font-semibold text-base-content">{game.title}</span>
                </p>

                <div className="flex justify-end gap-3 mt-8">
                    <button
                        onClick={() => setIsOpen(false)}
                        disabled={isPending}
                        className="btn btn-outline btn-ghost"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isPending}
                        className="btn btn-outline btn-error"
                    >
                        {isPending && <span className="loading loading-spinner loading-xs" />}
                        {isPending ? "Deleting..." : "Yes, delete"}
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="btn btn-xs btn-outline btn-error">
                <TrashIconCustom />
            </button>

            {isOpen && typeof window !== "undefined" && createPortal(modal, document.body)}

            {showToast && typeof window !== "undefined" && createPortal(
                <div className="toast toast-top toast-end z-50">
                    <div className="alert alert-success">
                        <span>Game: <strong>{game.title}</strong> deleted successfully</span>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}