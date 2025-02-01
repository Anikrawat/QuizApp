import { Button } from "@/components/ui/button";
import { Kanit } from "next/font/google";
import Link from "next/link";


const kanit = Kanit({ subsets: ["latin"], weight: "400" });
const kanitHeading = Kanit({ subsets: ["latin"], weight: "600" });

export default function Home() {
  return (
    <div className="w-[100vw] h-[90vh] flex justify-center items-center">
      <div className="w-[50vw] h-[80vh] flex items-center">
        <div className="w-full h-fit flex flex-col items-center">
          <h1 className={`text-4xl ${kanit.className}`}>
            Introducing{" "}
            <span className="text-[#c0a0e2]">Instructional Suite</span>
          </h1>
          <h1 className={`text-7xl text-center ${kanitHeading.className}`}>
            {" "}
            {`"I had no idea Quiz-Master could do that"`}{" "}
          </h1>
          <p className="text-xl text-gray-500 mt-4">- Almost Everybody</p>
          <div className="bg-gray-400 w-full h-[1] my-8"> </div>
          <span className="flex justify-center w-[30vw] mb-4">
            <p className="text-center text-2xl">
              Create and deliver bell-to-bell curriculum resources that meet the
              needs of every student.
            </p>
          </span>
          <Button className="w-[10vw] h-[5vh] bg-[#8854C0] hover:bg-[#c0a0e2]" asChild>
            <Link href="/quiz">Start Quiz</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
