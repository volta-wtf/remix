import { Disclosure } from "@/components/docs/Disclosure";
import { Label } from "@/components/docs/Label";
import { ColorSwatch } from "@/components/docs/Colors";
import { TintSwatch } from "@/components/docs/Colors";

export default function GuidePage() {
    return (
        <div className="px-10">

            <section>
                <h1 className="text-headline text-heading">
                    Playground
                </h1>
                <h3 className="text-lead text-muted">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </h3>
                <hr className="my-8" />
            </section>
            <main className="flex">

                <section className="w-3/4">
                    asd
                </section>
                <aside className="w-1/4">
                    <Disclosure label="Base colors">
                        <Label label="Base colors" />
                        <ColorSwatch className="primary" />
                        <ColorSwatch className="secondary" />
                        <ColorSwatch className="foreground" />
                        <ColorSwatch className="background" />
                        <Label label="Surfaces colors" />
                        <ColorSwatch className="surface" />
                        <ColorSwatch className="card" />
                        <ColorSwatch className="popover" />
                        <ColorSwatch className="dialog" />
                        <Label label="Contrast colors" />
                        <TintSwatch className="heading" />
                        <TintSwatch className="text" />
                        <TintSwatch className="icon" />
                        <TintSwatch className="decoration" />
                        <TintSwatch className="form" />
                        <TintSwatch className="states" />
                        <ColorSwatch className="caret" />
                        <Label label="Ambient colors" />
                        <TintSwatch className="ambient" />
                        <TintSwatch className="scrim" />
                        <TintSwatch className="shadow" />
                        <Label label="Funtional colors" />
                        <ColorSwatch className="error" />
                        <ColorSwatch className="warning" />
                        <ColorSwatch className="success" />
                        <Label label="Accent tints" />
                        <TintSwatch className="active" />
                        <TintSwatch className="accent" />
                        <Label label="Contrast tints" />
                        <ColorSwatch className="link" />
                        <ColorSwatch className="ring" />
                        <ColorSwatch className="selection" />
                        <ColorSwatch className="highlight" />
                        <Label label="Utility colors" />
                        <ColorSwatch className="max-contrast" />
                        <ColorSwatch className="min-contrast" />
                    </Disclosure>

                    <Disclosure label="Color theme">
                        <Label label="Brand colors" />
                        <ColorSwatch className="primary" />
                        <ColorSwatch className="secondary" />
                        <ColorSwatch className="tertiary" />
                        <Label label="Base colors" />
                        <ColorSwatch className="foreground" />
                        <ColorSwatch className="background" />
                        <Label label="Surfaces colors" />
                        <ColorSwatch className="surface" />
                        <ColorSwatch className="card" />
                        <ColorSwatch className="popover" />
                        <ColorSwatch className="dialog" />
                        <Label label="Accent color  " />
                        <ColorSwatch className="caret" />
                        <ColorSwatch className="accent" />
                        <ColorSwatch className="active" />
                        <ColorSwatch className="link" />
                        <ColorSwatch className="ring" />
                        <ColorSwatch className="selection" />
                        <ColorSwatch className="highlight" />
                        <Label label="Funtional colors" />
                        <ColorSwatch className="error" />
                        <ColorSwatch className="warning" />
                        <ColorSwatch className="success" />
                        <ColorSwatch className="info" />
                        <Label label="Utility colors" />
                        <ColorSwatch className="max-contrast" />
                        <ColorSwatch className="min-contrast" />
                        <ColorSwatch className="lightest" />
                        <ColorSwatch className="darkest" />
                        <ColorSwatch className="clear" />
                        <ColorSwatch className="current" />
                    </Disclosure>

                    <Disclosure label="Color settings">
                        <Label label="Contrast colors" />
                        <TintSwatch className="heading" />
                        <TintSwatch className="text" />
                        <TintSwatch className="icon" />
                        <TintSwatch className="decoration" />
                        <TintSwatch className="form" />
                        <Label label="Ambient colors" />
                        <TintSwatch className="ambient" />
                        <TintSwatch className="variant" />
                        <TintSwatch className="scrim" />
                        <TintSwatch className="shadow" />
                        <Label label="Accent tints" />
                        <TintSwatch className="states" />
                        <TintSwatch className="active" />
                        <TintSwatch className="accent" />
                        <TintSwatch className="surface" />
                        <TintSwatch className="highlight" />
                    </Disclosure>

                </aside>
            </main>

        </div>
    );
}