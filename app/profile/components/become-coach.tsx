import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";

export function BecomeCoach() {
  const [ready, setReady] = useState(false);

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(49);

  useEffect(() => {
    console.log("description changed:", description);
  }, [description]);

  useEffect(() => {
    console.log("price changed:", price);
  }, [price]);

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline"> Become a coach </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle> Ready to become a coach? </DialogTitle>
            <DialogDescription>
              We just need to know a few things before we get started
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="block-end-textarea">
                {" "}
                Coach description{" "}
              </FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  // onChange={(v) => setDescription(v.currentTarget.textContent)}
                  onChange={(e) => {
                    console.log(e.target.getHTML());
                  }}
                  id="block-end-textarea"
                  placeholder="Tell us about yourself as a coach"
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText>{description.length}/280</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="block-end-input"> Monthly Price </FieldLabel>
              <InputGroup className="h-auto">
                <InputGroupInput
                  id="block-end-input"
                  type=""
                  placeholder="Enter amount"
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText>DKK</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field>
              <Label htmlFor="max-clients">Maximum clients</Label>
              <Input
                type="number"
                min={1}
                max={25}
                step={1}
                id="max-clients"
                name="price"
                defaultValue="5"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              disabled={ready}
              className="bg-primary text-primary-foreground"
              type="submit"
            >
              Become a coach
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
