
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export function getCookieOrLocalStorage(key: string): string | null {
  // First try to get from cookies
  const cookieValue = Cookies.get(key);
  if (cookieValue) return cookieValue;
  
  // Then fall back to localStorage
  return localStorage.getItem(key);
}

export function getCookieValue(key: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const name = key + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // For order history, use cookies instead of localStorage
      if (key === 'restaurant_order_history') {
        const cookieValue = Cookies.get(key);
        return cookieValue ? JSON.parse(cookieValue) : initialValue;
      }
      
      // For other data, use localStorage as before
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading storage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      // For order history, always save to cookies with longer expiry
      if (key === 'restaurant_order_history') {
        // Set cookie with expiry of 30 days for better persistence
        if (Array.isArray(storedValue) && storedValue.length > 0) {
          Cookies.set(key, JSON.stringify(storedValue), { expires: 30 });
        } else {
          // Don't remove the cookie if empty, just maintain it
          Cookies.set(key, JSON.stringify([]), { expires: 30 });
        }
      }
      
      // Always update localStorage for all data
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting storage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
