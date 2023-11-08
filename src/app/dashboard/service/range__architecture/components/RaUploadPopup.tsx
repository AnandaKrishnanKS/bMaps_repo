import {
  AlertDialog,
  AlertDialogContent,
} from "@/src/components/shared/alert-dialog";
import { Button } from "@/src/components/shared/button";
import { useContext, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { RaContext } from "./RaController";
import { Input } from "@/src/components/shared/input";
import { uploadExcel } from "@/src/app/api/ra";
import { toast } from "@/src/components/shared/use-toast";

export default function RaUploadPopUp({ open, setOpen }: any) {
  const { dispatchBody, webSocketData, body } = useContext(RaContext);
  const [fileList, setFileList] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  function onSubmitHandler(e: any) {
    setDisableButton(true);
    const formData: any = new FormData();
    formData.append("file", fileList[0]);
    dispatchBody({
      type: "RA_UPLOAD_INIT",
    });
    uploadExcel(formData)
      .then((response: any) => {
        if (response?.status === 200) {
          dispatchBody({
            type: "RA_UPLOAD_SUCCESS",
          });
          setDisableButton(false);
          setOpen(false);
        }
      })
      .catch((err) => {
        setDisableButton(false);
        toast({
          variant: "destructive",
          title: "Error",
          description: err?.response?.data?.status,
        });
      });
  }
  function onFileChangeHandler(e: any) {
    setFileList(e.target.files);
  }
  return (
    <div className="ml-1 mr-2">
      <AlertDialog open={open}>
        <AlertDialogContent>
          <Input
            className=" text-center h-10 ml-auto mr-auto w-52"
            onChange={onFileChangeHandler}
            id="file"
            type="file"
          />
          <Button
            className=" ml-auto mr-auto w-52"
            onClick={onSubmitHandler}
            disabled={disableButton}
          >
            Upload
          </Button>
          <Button
            className=" ml-auto mr-auto w-52"
            onClick={() => setOpen(false)}
            variant="outline"
            disabled={disableButton}
          >
            Cancel
          </Button>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
