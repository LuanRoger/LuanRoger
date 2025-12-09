import { ModuleMetadata } from "metrics-modules/modules";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";

interface ModuleRenderItemProps {
  moduleMetadata: ModuleMetadata;
  base64Image: string;
}

export default function ModuleRenderItem({
  moduleMetadata,
  base64Image,
}: ModuleRenderItemProps) {
  const { name, description, width, height } = moduleMetadata;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          {name}
          <Badge>
            {width}x{height}
          </Badge>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Image
          width={width}
          height={height}
          src={`data:image/webp;base64,${base64Image}`}
          alt="module preview"
        />
      </CardContent>
    </Card>
  );
}
