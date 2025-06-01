import { Extension } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import { CommandList } from "./CommandList";
import tippy, { Instance } from "tippy.js"; // Recommended for popups

interface CommandItem {
  title: string;
  description: string;
  icon: string;
  command: (props: { editor: any; range: any }) => void;
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

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
        command: ({
          editor,
          range,
          props,
        }: {
          editor: any;
          range: any;
          props: any;
        }) => {
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
        items: ({ query }: { query: string }) => {
          return query
            ? commands.filter((item) =>
                item.title.toLowerCase().includes(query.toLowerCase())
              )
            : commands;
        },
        render: () => {
          let component: ReactRenderer;
          let popup: Instance;

          return {
            onStart: (props: any) => {
              component = new ReactRenderer(CommandList, {
                props: {
                  ...props,
                  items: commands, // Pass all commands initially
                },
                editor: props.editor,
              });

              // Using tippy.js for better popup handling
              popup = tippy("body", {
                getReferenceClientRect: props.clientRect,
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
              })[0];
            },

            onUpdate: (props: any) => {
              component.updateProps(props);

              popup?.setProps({
                getReferenceClientRect: props.clientRect,
              });
            },

            onKeyDown: (props: { event: KeyboardEvent }) => {
              if (props.event.key === "Escape") {
                popup?.hide();
                return true; // Indicates the event was handled
              }

              // Type-safe access to the component's ref
              const commandListRef = component.ref as
                | { onKeyDown?: (props: { event: KeyboardEvent }) => boolean }
                | undefined;

              // Handle navigation keys only if CommandList is ready
              if (["ArrowUp", "ArrowDown", "Enter"].includes(props.event.key)) {
                return commandListRef?.onKeyDown?.(props) ?? false;
              }

              return false; // Event not handled
            },
            
            onExit: () => {
              popup?.destroy();
              component.destroy();
            },
          };
        },
      }),
    ];
  },
});
