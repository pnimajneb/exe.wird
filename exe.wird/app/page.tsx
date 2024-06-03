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
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </main>
  );
}
