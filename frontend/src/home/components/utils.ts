import * as React from 'react';
import Container from 'typedi';

type ClassConstructor<U, T> = { new (u: U): T };

export const useTransient = function<U, T>(klass: ClassConstructor<U, T>, props: U) {
  if (!Container.has(klass)) {
    Container.set(klass, new klass(props));
  }
  return Container.get(klass);
};

export function useStateTransient<T>(f: () => T, deps?: readonly any[]) {
  return React.useMemo(f, deps || []);
}
