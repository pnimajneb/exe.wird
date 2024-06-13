import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Circle,
  Type,
  Upload,
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
      <div className="w-1/2 h-full flex m-12">
        <div className="flex flex-col gap-12">
          <Button>
            <Upload />
          </Button>
          <Button>
            <Type />
          </Button>
          <Button>
            <Grid2X2Check />
          </Button>
        </div>
        <div className="border-neutral-600 border-2 rounded-[2px] flex flex-col gap-4 p-12">
          <Textarea className="p-4" />
          <Select>
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="Schriftart" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="test1">Test1</SelectItem>
              <SelectItem value="test2">Test2</SelectItem>
              <SelectItem value="test3">Test3</SelectItem>
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
      </div>
    </main>
  );
}
