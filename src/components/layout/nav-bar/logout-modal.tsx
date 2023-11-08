import React, { useState, Dispatch, SetStateAction, useCallback, useMemo, } from "react";
import { useRouter } from "next/navigation";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { logout } from "@/app/api/auth"
import { Button } from "@/components/shared/button"
import Modal from "@/components/shared/modal";

interface LogOutModalProps {
    showLogOutModal: boolean;
    setShowLogOutModal: Dispatch<SetStateAction<boolean>>;
}

export const useLogOutModal = () => {
    const router = useRouter();

    const handleLogout = useCallback(() => {
        logout();
        router.replace("/");
    }, [router]);

    const LogOutModal = useCallback(({ showLogOutModal, setShowLogOutModal }: LogOutModalProps) => {
        return (
            <Modal showModal={showLogOutModal} setShowModal={setShowLogOutModal}>
                <div className="w-full overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl">
                    <div className="flex flex-col items-center justify-center space-y-3 bg-white px-4 py-6 pt-8 text-center md:px-16">
                        <a href="#">
                            <ExclamationTriangleIcon className="font-bold " />
                        </a>
                        <h3 className="font-display text-2xl font-bold">Are you sure?</h3>
                        <p className="text-sm text-gray-500">
                            You may have unsaved changes.
                        </p>
                        <div className="flex flex-row w-full justify-evenly">
                            <Button className="w-16" variant="default" onClick={() => handleLogout()}>Yes</Button>
                            <Button className="w-16" variant="destructive" onClick={() => setShowLogOutModal(false)}>Cancel</Button>
                        </div>
                    </div>
                </div>
                </Modal>
        );
    }, [handleLogout]);

    const [showLogOutModal, setShowLogOutModal] = useState(false);

    const LogOutModalCallback = useCallback(() => {
        return (
            <LogOutModal
                showLogOutModal={showLogOutModal}
                setShowLogOutModal={setShowLogOutModal}
            />
        );
    }, [LogOutModal, showLogOutModal]);

    return useMemo(
        () => ({ setShowLogOutModal, LogOutModal: LogOutModalCallback }),
        [setShowLogOutModal, LogOutModalCallback],
    );
}
