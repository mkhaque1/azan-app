import * as Location from 'expo-location';

export default function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission denied');
    }
    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  return { location, getLocation };
}
function useState<T>(
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  return reactUseState(initialValue);
}

function reactUseState<T>(
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  let state = initialValue;
  const setState: React.Dispatch<React.SetStateAction<T>> = (newValue) => {
    if (typeof newValue === 'function') {
      state = (newValue as (prevState: T) => T)(state);
    } else {
      state = newValue;
    }
  };
  return [state, setState];
}
