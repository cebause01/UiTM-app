"use client";

import { useEffect, useId, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QrScannerProps {
  active: boolean;
  onScan: (decodedText: string) => void;
  onCameraError: (message: string) => void;
}

const SCAN_CONFIG = {
  fps: 12,
  qrbox: (viewfinderWidth: number, viewfinderHeight: number) => {
    const size = Math.min(viewfinderWidth, viewfinderHeight) * 0.72;
    return { width: size, height: size };
  },
  aspectRatio: 1,
} as const;

export function QrScanner({ active, onScan, onCameraError }: QrScannerProps) {
  const containerId = useId().replace(/:/g, "");
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const handledRef = useRef(false);
  const onScanRef = useRef(onScan);
  const onCameraErrorRef = useRef(onCameraError);

  onScanRef.current = onScan;
  onCameraErrorRef.current = onCameraError;

  useEffect(() => {
    if (!active) {
      handledRef.current = false;
      return;
    }

    const scanner = new Html5Qrcode(containerId);
    scannerRef.current = scanner;

    const stopScanner = async () => {
      if (scanner.isScanning) {
        try {
          await scanner.stop();
        } catch {
          /* already stopped */
        }
      }
    };

    const onSuccess = (decodedText: string) => {
      if (handledRef.current) return;
      handledRef.current = true;
      void stopScanner();
      onScanRef.current(decodedText);
    };

    const startScanner = async () => {
      try {
        // Prefer rear camera on phones
        try {
          await scanner.start(
            { facingMode: { exact: "environment" } },
            SCAN_CONFIG,
            onSuccess,
            () => {}
          );
          return;
        } catch {
          await scanner.start(
            { facingMode: "environment" },
            SCAN_CONFIG,
            onSuccess,
            () => {}
          );
          return;
        }
      } catch {
        /* fall through to enumerated cameras */
      }

      try {
        const cameras = await Html5Qrcode.getCameras();
        if (!cameras.length) {
          onCameraErrorRef.current("No camera found on this device.");
          return;
        }

        const backCamera = cameras.find((cam) =>
          /back|rear|environment/i.test(cam.label)
        );
        const cameraId = backCamera?.id ?? cameras[cameras.length - 1].id;

        await scanner.start(cameraId, SCAN_CONFIG, onSuccess, () => {});
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Could not access the camera. Allow permission and try again.";
        onCameraErrorRef.current(message);
      }
    };

    void startScanner();

    return () => {
      void stopScanner();
      scannerRef.current = null;
    };
  }, [active, containerId]);

  return (
    <div className="qr-scanner-root relative size-full overflow-hidden rounded-2xl bg-black">
      <div id={containerId} className="size-full" />
    </div>
  );
}
