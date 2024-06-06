export interface EntidadListState<T> {
    cargando: boolean;
    lista: T[];
    errorCarga: boolean;
    showErrorModal: boolean;
    showSuccessModal: boolean;
    errorMessage: string;
  }
  