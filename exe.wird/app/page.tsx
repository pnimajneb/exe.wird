import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Circle,
  WrapText,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import { Textarea } from "../components/ui/textarea";

export default function Home() {
  return (
    <main>
      <div className="border-black border-2 rounded-[2px] w-1/2 h-full flex flex-col gap-4 p-12 m-12">
        <Textarea className="p-4" />
        <Select>
          <SelectTrigger className="w-1/2">
            <SelectValue placeholder="Schriftart" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Test1</SelectItem>
            <SelectItem value="dark">Test2</SelectItem>
            <SelectItem value="system">Test3</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-1/2">
            <SelectValue placeholder="Farbe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="white">
              <div className="flex items-center gap-2">
                <Circle className="text-neutral-200 fill-white" />
                Weiß
              </div>
            </SelectItem>
            <SelectItem value="yellow">
              <div className="flex items-center gap-2">
                <Circle className="text-yellow-300 fill-yellow-400" />
                Gelb
              </div>
            </SelectItem>
            <SelectItem value="purple">
              <div className="flex items-center gap-2">
                <Circle className="text-purple-300 fill-purple-400" />
                Violett
              </div>
            </SelectItem>
            <SelectItem value="black">
              <div className="flex items-center gap-2">
                <Circle className="text-black fill-black" />
                Schwarz
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        <div>
          <p className="pb-2 pt-4">Textausrichtung</p>
          <Button variant={"outline"} className="mr-2">
            <AlignLeft />
          </Button>
          <Button variant={"outline"} className="mr-2">
            <AlignRight />
          </Button>
          <Button variant={"outline"} className="mr-2">
            <AlignCenter />
          </Button>
          <Button variant={"outline"} className="mr-2">
            <AlignJustify />
          </Button>
        </div>
        <div>
          <p className="pb-2 pt-4">Zeilen- & Zeichenabstand</p>
          <Button variant={"outline"}>
            <WrapText />
          </Button>
        </div>
      </div>
    </main>
  );
}
