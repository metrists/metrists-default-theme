import {
  useFetcher,
  useOutletContext,
  Outlet,
  type MetaFunction,
} from "@remix-run/react";
import { useOptimisticThemeMode } from "@utils/hooks/use-theme";
import { type Theme } from "~/utils/theme.server";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@components/ui/menubar";
import { Separator } from "@components/ui/separator";
import { Logo } from "@components/patterns/logo";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const fetcher = useFetcher({});

  const { userPreferences } = useOutletContext<{
    userPreferences: { theme: Theme };
  }>();

  const optimisticMode = useOptimisticThemeMode();
  const mode = optimisticMode ?? userPreferences?.theme ?? "system";
  const nextMode =
    mode === "system" ? "light" : mode === "light" ? "dark" : "light";
  const modeLabel = {
    light: "Light Mode",
    dark: "Dark Mode",
    system: "System Settings",
  };

  return (
    <>
      <div>
        <div className="flex justify-start align-center">
          <Menubar className="px-2 border-b border-none rounded-none lg:px-4">
            <Logo width="60px" height="20px" />
            <MenubarMenu>
              <MenubarTrigger className="relative">File</MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger>New</MenubarSubTrigger>
                  <MenubarSubContent className="w-[230px]">
                    <MenubarItem>
                      Playlist <MenubarShortcut>⌘N</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem disabled>
                      Playlist from Selection{" "}
                      <MenubarShortcut>⇧⌘N</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      Smart Playlist... <MenubarShortcut>⌥⌘N</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>Playlist Folder</MenubarItem>
                    <MenubarItem disabled>Genius Playlist</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarItem>
                  Open Stream URL... <MenubarShortcut>⌘U</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Close Window <MenubarShortcut>⌘W</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>Library</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Update Cloud Library</MenubarItem>
                    <MenubarItem>Update Genius</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Organize Library...</MenubarItem>
                    <MenubarItem>Export Library...</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Import Playlist...</MenubarItem>
                    <MenubarItem disabled>Export Playlist...</MenubarItem>
                    <MenubarItem>Show Duplicate Items</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Get Album Artwork</MenubarItem>
                    <MenubarItem disabled>Get Track Names</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarItem>
                  Import... <MenubarShortcut>⌘O</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled>Burn Playlist to Disc...</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  Show in Finder <MenubarShortcut>⇧⌘R</MenubarShortcut>{" "}
                </MenubarItem>
                <MenubarItem>Convert</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Page Setup...</MenubarItem>
                <MenubarItem disabled>
                  Print... <MenubarShortcut>⌘P</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarItem
                  onClick={() =>
                    fetcher.submit(
                      {
                        intent: "update-theme",
                        theme: nextMode,
                      },
                      { method: "POST", action: "/preferences/theme" }
                    )
                  }
                >
                  {modeLabel[nextMode as Theme]}
                  <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarCheckboxItem checked>Show Lyrics</MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarItem inset disabled>
                  Show Status Bar
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Hide Sidebar</MenubarItem>
                <MenubarItem disabled inset>
                  Enter Full Screen
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="hidden md:block">
                Account
              </MenubarTrigger>
              <MenubarContent forceMount>
                <MenubarLabel inset>Switch Account</MenubarLabel>
                <MenubarSeparator />
                <MenubarRadioGroup value="benoit">
                  <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                  <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                  <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
                </MenubarRadioGroup>
                <MenubarSeparator />
                <MenubarItem inset>Manage Family...</MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Add Account...</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <Separator />
      </div>
      <Outlet />
    </>
  );
}
