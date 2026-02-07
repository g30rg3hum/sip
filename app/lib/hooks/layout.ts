import { useCallback, useState } from "react";

export default function useComponentSize() {
  const [size, setSize] = useState<null | { width: number; height: number }>(
    null,
  );

  const onLayout = useCallback((event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
}
