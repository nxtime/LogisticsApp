import { makeAutoObservable, toJS } from "mobx"
import Cookie from 'mobx-cookie';
import { ReactNode } from "react";

export interface Windows {
  currentSelectedId: any;
  dragging: boolean;
  windows: any[];
  layouts: any[];

}

class WindowsStore {
  currentSelectedId: any = null;
  dragging: boolean = false;
  windows: { id: string, Component: any }[] = [];
  layouts: { lg: any[]; md: any[], sm: any[], xs: any[] } = { lg: [], md: [], sm: [], xs: [] };

  constructor() {
    makeAutoObservable(this);
  }

  changeDragging = (dragging: boolean, currentSelectedId = null) => {
    this.dragging = dragging;
    this.currentSelectedId = currentSelectedId;
  }

  addWindow = (window: any) => {
    const id = crypto.randomUUID();

    Object.keys(this.layouts).forEach((value: any) => {
      this.layouts[value as "lg" | "md"].push({
        i: id,
        x: 0,
        y: 0,
        w: 6,
        h: 4,
        minW: 6,
        minH: 4,
        isDraggable: true,
        isResizable: true,
      });
    });

    this.windows.push({ id, Component: window });

  }

  get getLayouts() {
    return toJS(this.layouts);
  }

  set setLayouts(layouts: any) {
    this.layouts = layouts;
  }

  removeWindow = (windowId: string) => {
    console.log("Window id to remove: ", windowId);
    this.windows = this.windows.filter(({ id }) => id !== windowId);
    console.log(this.getLayouts);
    Object.keys(this.layouts).forEach((value: any) => {
      this.layouts[value as "lg" | "md"] = this.layouts[value as "lg" | "md"].filter(({ i }) => i !== windowId);
    });
  }

}

export const windowsStore = new WindowsStore();