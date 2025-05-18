import styles from './modal-overlay.module.css';

export const ModalOverlayUI = ({
  onClick,
  'data-cy': dataCy = 'ModalOverlayUI'
}: {
  onClick: () => void;
  'data-cy'?: string;
}) => <div data-cy={dataCy} className={styles.overlay} onClick={onClick} />;
