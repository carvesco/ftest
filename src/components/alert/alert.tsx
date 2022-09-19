import React from "react";
import Swal from "sweetalert2";

export const showAlertSuccess = (titleSuccess: string, textSuccess: string) => {
  Swal.fire({
    title: `${titleSuccess}`,
    text: `${textSuccess}`,
    showCloseButton: true,
    showConfirmButton: false,
    timer: 1500,
    color: "#a92c2c",
    background: "#b4e0e2",
  });
};

export const showAlertError = (titleError: string, textError?: string) => {
    Swal.fire({
      title: `${titleError}`,
      text: `${textError}` || " ",
      showCloseButton: true,
      showConfirmButton: false,
      timer: 1500,
      color: "#ffffff",
      background: "#a92c2c",
    });
  };
