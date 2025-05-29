import { Extension } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import { CommandList } from "./CommandList";
import { useEffect, useState } from "react";

const commands = [
  {
    title: "Heading 1",
    description: "Big section heading",
    icon: "H1",
    command: ({ editor, range }: any) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading",
    icon: "H2",
    command: ({ editor, range }: any) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
  },
  {
    title: "Paragraph",
    description: "Normal text",
    icon: "P",
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).setParagraph().run();
    },
  },
  {
    title: "Bullet List",
    description: "Create a simple bullet list",
    icon: "•",
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
];

export const SlashCommand = Extension.create({
  name: "slash-command",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({ editor, range, props }: any) => {
          props.command({ editor, range });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
        items: ({ query }: any) => {
          return commands.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
          );
        },
        render: () => {
          let component: ReactRenderer<any>;
          let popup: any;

          return {
            onStart: (props: any) => {
              component = new ReactRenderer(CommandList, {
                props,
                editor: props.editor,
              });

              popup = document.createElement("div");
              popup.className = "command-list";
              popup.appendChild(component.element);
              document.body.appendChild(popup);

              updatePopup(props);
            },
            onUpdate: (props: any) => {
              updatePopup(props);

              component.updateProps(props);
            },
            onKeyDown: (props: any) => {
              if (props.event.key === "Escape") {
                popup?.remove?.();
                return true;
              }

              return component.ref?.onKeyDown(props);
            },
            onExit: () => {
              popup?.remove?.();
              component.destroy();
            },
          };

          function updatePopup(props: any) {
            const { from, to } = props.clientRect();
            popup.style.position = "absolute";
            popup.style.left = `${from.left}px`;
            popup.style.top = `${to.bottom + window.scrollY}px`;
          }
        },
      }),
    ];
  },
});
