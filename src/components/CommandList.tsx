"use client"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

export const CommandList = forwardRef((props: any, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];

    if (item) {
      props.command(item);
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: any) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {props.items.length ? (
        props.items.map((item: any, index: number) => (
          <button
            className={`block w-full text-left px-4 py-2 ${
              index === selectedIndex ? "bg-gray-100" : ""
            }`}
            key={index}
            onClick={() => selectItem(index)}
          >
            <div className="flex items-center">
              <div className="mr-2">{item.icon}</div>
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
            </div>
          </button>
        ))
      ) : (
        <div className="px-4 py-2 text-gray-500">No result</div>
      )}
    </div>
  );
});

CommandList.displayName = "CommandList";
