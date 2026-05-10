import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./offline-banner.module.css";

type Props = {
  message: string;
  retryable?: boolean;
  onRetry: () => void;
};

export function OfflineBanner({ message, retryable = true, onRetry }: Props) {
  return (
    <div className={styles.banner} role="status">
      <TriangleAlert size={16} className={styles.icon} />
      <span className={styles.text}>
        {message}
      </span>
      {retryable && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className={styles.retryButton}
        >
          Retry
        </Button>
      )}
    </div>
  );
}
