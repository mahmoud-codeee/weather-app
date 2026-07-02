import { useState, useCallback } from "react";

interface GeolocationState {
  loading: boolean;
  error: string | null;
}

interface UseGeolocationReturn extends GeolocationState {
  getLocation: () => void;
}

export function useGeolocation(onSuccess: (lat: number, lon: number) => void): UseGeolocationReturn {
  const [state, setState] = useState<GeolocationState>({ loading: false, error: null });

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState({ loading: false, error: "Geolocation is not supported by your browser." });
      return;
    }
    setState({ loading: true, error: null });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({ loading: false, error: null });
        onSuccess(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        const message =
          err.code === 1 ? "Location access denied. Please allow location access."
          : err.code === 2 ? "Location unavailable. Try searching by city name."
          : "Location request timed out. Try searching by city name.";
        setState({ loading: false, error: message });
      },
      { timeout: 10000 }
    );
  }, [onSuccess]);

  return { ...state, getLocation };
}
