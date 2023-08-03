"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Joel",
    avatarSrc: "/joel.jpg",
    title: "Software Engineer",
    description: "This is the best application I've used!",
  },
  {
    name: "Antonio",
    avatarSrc: "/antonio.jpg",
    title: "Designer",
    description: "I use this daily for generating new photos!",
  },
  {
    name: "Mark",
    avatarSrc: "/mark.jpg",
    title: "CEO",
    description: "This app has changed my life, cannot imagine working without it!",
  },
  {
    name: "Mary",
    avatarSrc: "/mary.jpg",
    title: "CFO",
    description: "The best in class, definitely worth the premium subscription!",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card key={item.description} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <Avatar>
                  <AvatarImage src={item.avatarSrc} />
                  <AvatarFallback className="text-base text-[#192339]">
                    {item.name.charAt(0).toUpperCase()}
                    {item.name.charAt(1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">{item.description}</CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
