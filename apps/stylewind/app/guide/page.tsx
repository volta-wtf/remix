import { Summary } from "@/components/docs/Disclosure";
import { Disclosure } from "@/components/docs/Disclosure";
import { Caption } from "@/components/docs/Caption";
import { Label } from "@/components/docs/Label";
import { ColorPalette } from "@/components/docs/Colors";
import { TonalPalette } from "@/components/docs/Colors";
import { ColorTone } from "@/components/docs/Colors";
import { ColorSwatch } from "@/components/docs/Colors";
import { TintSwatch } from "@/components/docs/Colors";
import { ShapeSwatch } from "@/components/docs/Shapes";
import { Icon } from "@/components/docs/Icon";
import { IconSvg } from "@/components/demo/icon-svg";

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

                    <details id="colors">
                        <Summary label="Colors" />
                        <div className="mb-4 gap-2">
                            <div className="flex gap-2">
                                <div className="w-20 h-20 bg-lightest"></div>
                                <div className="w-20 h-20 bg-darkest"></div>
                                <div className="w-20 h-20 bg-clear"></div>
                                <div className="w-20 h-20 bg-current"></div>
                            </div>

                            <div className="flex gap-2">
                                <div className="w-20 h-20 bg-max-contrast"></div>
                                <div className="w-20 h-20 bg-foreground"></div>
                                <div className="w-20 h-20 bg-background"></div>
                                <div className="w-20 h-20 bg-surface-alpha"></div>
                                <div className="w-20 h-20 bg-surface"></div>
                                <div className="w-20 h-20 bg-variant-bright"></div>
                                <div className="w-20 h-20 bg-variant"></div>
                                <div className="w-20 h-20 bg-variant-dim"></div>
                                <div className="w-20 h-20 bg-scrim-soft"></div>
                                <div className="w-20 h-20 bg-scrim"></div>
                                <div className="w-20 h-20 bg-scrim-hard"></div>
                                <div className="w-20 h-20 bg-min-contrast"></div>
                            </div>

                            <div className="flex gap-2">
                                <div className="w-20 h-20 bg-primary"></div>
                                <div className="w-20 h-20 bg-secondary"></div>
                                <div className="w-20 h-20 bg-tertiary"></div>
                                <div className="w-20 h-20 bg-error"></div>
                                <div className="w-20 h-20 bg-warning"></div>
                                <div className="w-20 h-20 bg-success"></div>
                                <div className="w-20 h-20 bg-info"></div>
                            </div>


                        </div>
                    </details>

                    <details id="borders">
                        <Summary label="Borders" />
                        <div className="mb-4">
                            <div className="flex gap-2">
                                <div className="w-20 h-20 border border-outline"></div>
                                <div className="w-20 h-20 border"></div>
                                <div className="w-20 h-20 border border-divider"></div>
                                <div className="w-20 h-20 border border-line"></div>
                                <div className="w-20 h-20 border border-ring"></div>
                                <div className="w-20 h-20 outline"></div>
                                <div className="w-20 h-20 outline outline-dashed "></div>
                                <div className="w-20 h-20 outline outline-small"></div>
                                <div className="w-20 h-20 outline outline-large"></div>
                            </div>
                        </div>
                    </details>

                    <details id="layout">
                        <Summary label="Layout" />
                        <div className="mb-4">
                            <h3>flex</h3>
                            <div className="flex mt-2">
                                <div className="bg-variant border">card</div>
                                <div className="bg-variant border">card<br/>name</div>
                            </div>
                            <div className="flex mt-2">
                                <div className="bg-variant border">card</div>
                                <div className="grow bg-variant border">card<br />name</div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3>stack</h3>
                            <div className="stack">
                                <div className="bg-variant border">card</div>
                                <div className="bg-variant border">card<br />name</div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3>stack v</h3>
                            <div className="stack vertical">
                                <div className="bg-variant border">card</div>
                                <div className="bg-variant border">card</div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3>rows</h3>
                            <div className="rows">
                                <div className="bg-variant border">card</div>
                                <div className="bg-variant border">card</div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3>columns</h3>
                            <div className="columns">
                                <div className="bg-variant border">card</div>
                                <div className="bg-variant border">card</div>
                            </div>
                            <div className="columns">
                                <div className="w-8 bg-variant border">card</div>
                                <div className="bg-variant border">card</div>
                            </div>
                        </div>


                        <div className="layout-v">
                            <div className="bg-variant border">card</div>
                            <div className="bg-variant border">card</div>
                        </div>
                        <div className="layout-h">
                            <div className="bg-variant border">card</div>
                            <div className="bg-variant border">card</div>
                        </div>

                        <div className="stack">
                            <div className="ui-card">card</div>
                            <div className="ui-input">input</div>
                            <div className="ui-button">button</div>
                        </div>
                    </details>

                    <details id="typescale">
                        <Summary label="Typescale" />
                        <Caption label="Typography" />
                        <Label label="Display" />
                        <h1 className="text-display-1">Display 1</h1>
                        <h1 className="text-display-2">Display 2</h1>
                        <h1 className="text-display-3">Display 3</h1>
                        <Label label="Heading" />
                        <h1 className="text-headline">Headline</h1>
                        <h1 className="text-subhead">Subhead</h1>
                        <h1 className="text-title">Title</h1>
                        <h1 className="text-subtitle">Subtitle</h1>
                        <Label label="Text" />
                        <p className="text-lead">Lead</p>
                        <p className="text-body">Body</p>
                        <p className="text-base">Base</p>
                        <p className="text-small">Small</p>
                        <p className="text-micro">Micro</p>
                        <Caption label="Forms" />
                        <Label label="Labels" />
                        <p className="text-label">Label</p>
                        <p className="text-input">Input</p>
                        <p className="text-button">Button</p>
                        <Label label="Sizes" />
                        <p className="text-input-xs">Input xs</p>
                        <p className="text-input-sm">Input sm</p>
                        <p className="text-input-lg">Input lg</p>
                        <p className="text-button-xs">Button xs</p>
                        <p className="text-button-sm">Button sm</p>
                        <p className="text-button-lg">Button lg</p>
                        <Caption label="Utilities" />
                        <p className="text-overline">Overline</p>
                        <p className="text-caption">Caption</p>
                        <p className="text-footnote">Footnote</p>
                        <p className="text-hint">Hint</p>
                    </details>

                    <details id="Forms">
                        <Summary label="Forms" />
                        <Label label="Label" />
                        <label className="text-label">Label</label>
                        <Label label="Input" />
                        <div><input className="text-input" placeholder="Input" /></div>
                        <Label label="Button" />
                        <div><button className="text-button">Button</button></div>
                        <div><button className="text-button p-button bg-button">Button</button></div>
                        <div><button className="text-button p-button bg-filled text-lightest">Button</button></div>
                        <div><button className="text-button p-button bg-accent text-lightest">Button</button></div>
                        <div><button className="text-button p-button bg-active text-lightest">Button</button></div>
                        <Label label="Hint" />
                        <p className="text-hint">Hint</p>
                    </details>

                    <details id="text-scheme">
                        <Summary label="Text scheme" />
                        <p className="text-lead text-subtle">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <p className="text-lead text-muted">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <p className="text-lead text-disabled">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <p className="text-lead text-hint">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </details>

                    <details id="iconography">
                        <Summary label="Iconography" />
                        <Label label="Icon colors" />
                        <div className="flex gap-2">
                            <Icon className="icon-heading" />
                            <Icon className="icon-default" />
                            <Icon className="icon-subtle" />
                            <Icon className="icon-muted" />
                            <Icon className="icon-disabled" />
                            <Icon className="icon-hint" />
                        </div>
                        <div className="flex gap-2">
                            <IconSvg className="fill-icon-heading" />
                            <IconSvg className="fill-icon-default" />
                            <IconSvg className="fill-icon-subtle" />
                            <IconSvg className="fill-icon-muted" />
                            <IconSvg className="fill-icon-disabled" />
                            <IconSvg className="fill-icon-hint" />
                        </div>
                        <div className="flex gap-2">
                            <IconSvg className="stroke-icon-heading" />
                            <IconSvg className="stroke-icon-default" />
                            <IconSvg className="stroke-icon-subtle" />
                            <IconSvg className="stroke-icon-muted" />
                            <IconSvg className="stroke-icon-disabled" />
                            <IconSvg className="stroke-icon-hint" />
                        </div>

                        <Label label="Icon sizes" />
                        <div className="flex gap-2">
                            <Icon className="icon-2xs" />
                            <Icon className="icon-xs" />
                            <Icon className="icon-sm" />
                            <Icon className="icon-md" />
                            <Icon className="icon-lg" />
                            <Icon className="icon-xl" />
                            <Icon className="icon-2xl" />
                            <Icon className="icon-3xl" />
                            <Icon className="icon-4xl" />
                        </div>
                    </details>

                    <div>
                        {/* Sección de Colores Principales */}
                        <section className="space-y-4">

                            <div className="flex gap-4">
                                <input type="text" className="bg-input rounded-md p-2" />
                                <input type="text" className="border border-outline bg-input rounded-md p-2" />
                                <input type="text" className="border border-outline bg-transparent rounded-md p-2" />
                                <input type="text" className="border border-outline rounded-md p-2" />
                            </div>

                            <div className="flex gap-4">
                                <a href="#" className="rounded-full  text-background transition-colors flex items-center justify-center text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44">
                                    Read our docs
                                </a>
                                <a href="#" className="rounded-full bg-button transition-colors flex items-center justify-center text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44">
                                    Read our docs
                                </a>
                                <a href="#" className="rounded-full border border-button transition-colors flex items-center justify-center text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44">
                                    Read our docs
                                </a>
                            </div>

                            <hr />

                            <label>
                                <input type="checkbox" /> Customize
                            </label>


                            <div className="border divide-y divide-inherit divide-divider">
                                <div className="p-4">item</div>
                                <div className="p-4">item</div>
                                <div className="p-4">item</div>
                            </div>

                            {/* Colores Heredados */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">Key Colors</h2>
                                <div className="grid grid-cols-2 md:grid-cols-9 gap-4">
                                    <div className="p-4 rounded bg-neutral-600">Neutral</div>
                                    <div className="p-4 rounded bg-ambient-600">Ambient</div>
                                    <div className="p-4 rounded bg-primary">Primary</div>
                                    <div className="p-4 rounded bg-secondary">Secondary</div>
                                    <div className="p-4 rounded bg-tertiary">Tertiary</div>
                                    <div className="p-4 rounded bg-info">Info</div>
                                    <div className="p-4 rounded bg-error">Error</div>
                                    <div className="p-4 rounded bg-warning">Warning</div>
                                    <div className="p-4 rounded bg-success">Success</div>
                                </div>
                            </div>

                            {/* Superficies */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold text-default">Superficies</h2>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                    <div className="p-4 rounded bg-foreground bg-opacity-50">Foreground</div>
                                    <div className="p-4 rounded bg-surface">Surface</div>
                                    <div className="p-4 rounded bg-background">Background</div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                    <div className="p-4 rounded bg-surface-1">Surface 1</div>
                                    <div className="p-4 rounded bg-surface-2">Surface 2</div>
                                    <div className="p-4 rounded bg-surface-3">Surface 3</div>
                                    <div className="p-4 rounded bg-surface-4">Surface 4</div>
                                    <div className="p-4 rounded bg-surface-5">Surface 5</div>
                                </div>
                            </div>

                            {/* Textos */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">Variantes de Texto</h2>
                                <p className="text-default">Texto Default</p>
                                <p className="text-subtle">Texto Subtle</p>
                                <p className="text-disabled">Texto Disabled</p>
                                <p className="text-hint">Texto Hint</p>
                            </div>


                        </section>

                        <div className="antialiased text-gray-900 px-6">
                            <div className="max-w-xl mx-auto py-12 md:max-w-4xl">
                                <h2 className="text-2xl font-bold">Reset styles</h2>
                                <p className="mt-2 text-lg text-gray-500">
                                    These are form elements this plugin styles by default.
                                </p>
                                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                    <div className="grid grid-cols-1 gap-6">
                                        <label className="block">
                                            <span className="text-gray-700">Input (text)</span>
                                            <input type="text" className="form-input mt-1 block w-full" placeholder="john@example.com" />
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Input (email)</span>
                                            <input type="email" className="form-input mt-1 block w-full" placeholder="john@example.com" />
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Input (email, multiple)</span>
                                            <input type="email" multiple className="form-input mt-1 block w-full" placeholder="john@example.com" />
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Input (password)</span>
                                            <input type="password" className="form-input mt-1 block w-full" placeholder="john@example.com" />
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Input (date)</span>
                                            <input type="date" className="form-input mt-1 block w-full" />
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Input (datetime-local)</span>
                                            <input type="datetime-local" className="form-input mt-1 block w-full" />
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Input (month)</span>
                                            <input type="month" className="form-input mt-1 block w-full" />
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Input (number)</span>
                                            <input type="number" className="form-input mt-1 block w-full" />
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Input (search)</span>
                                            <input type="search" className="form-input mt-1 block w-full" />
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Input (time)</span>
                                            <input type="time" className="form-input mt-1 block w-full" />
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Input (week)</span>
                                            <input type="week" className="form-input mt-1 block w-full" />
                                        </label>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6">
                                        <label className="block">
                                            <span className="text-gray-700">Input (tel)</span>
                                            <input type="tel" multiple className="form-input mt-1 block w-full" placeholder="john@example.com" />
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Input (url)</span>
                                            <input type="url" multiple className="form-input mt-1 block w-full" placeholder="john@example.com" />
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Select</span>
                                            <select className="form-select block w-full mt-1">
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                            </select>
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Select (single, with size)</span>
                                            <select className="form-select block w-full mt-1" size={3}>
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                                <option>Option 3</option>
                                                <option>Option 4</option>
                                                <option>Option 5</option>
                                            </select>
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Select (multiple)</span>
                                            <select className="form-multiselect block w-full mt-1" multiple>
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                                <option>Option 3</option>
                                                <option>Option 4</option>
                                                <option>Option 5</option>
                                            </select>
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Select (multiple, with size)</span>
                                            <select className="form-multiselect block w-full mt-1" multiple size={3}>
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                                <option>Option 3</option>
                                                <option>Option 4</option>
                                                <option>Option 5</option>
                                            </select>
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Textarea</span>
                                            <textarea className="form-textarea mt-1 block w-full h-24" rows={3} placeholder="Enter some long form content."></textarea>
                                        </label>
                                        <fieldset className="block">
                                            <legend className="text-gray-700">Checkboxes</legend>
                                            <div className="mt-2">
                                                <div>
                                                    <label className="inline-flex items-center">
                                                        <input className="form-checkbox" type="checkbox" defaultChecked />
                                                        <span className="ml-2">Option 1</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="inline-flex items-center">
                                                        <input className="form-checkbox" type="checkbox" />
                                                        <span className="ml-2">Option 2</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="inline-flex items-center">
                                                        <input className="form-checkbox" type="checkbox" />
                                                        <span className="ml-2">Option 3</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <fieldset className="block">
                                            <legend className="text-gray-700">Radio Buttons</legend>
                                            <div className="mt-2">
                                                <div>
                                                    <label className="inline-flex items-center">
                                                        <input className="form-radio" type="radio" defaultChecked name="radio-direct" value="1" />
                                                        <span className="ml-2">Option 1</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="inline-flex items-center">
                                                        <input className="form-radio" type="radio" name="radio-direct" value="2" />
                                                        <span className="ml-2">Option 2</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="inline-flex items-center">
                                                        <input className="form-radio" type="radio" name="radio-direct" value="3" />
                                                        <span className="ml-2">Option 3</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                            <div className="max-w-4xl mx-auto py-12">
                                <h2 className="text-2xl font-bold">Untouched</h2>
                                <p className="mt-2 text-lg text-gray-500">
                                    These are form elements we don't handle (yet?), but we use this to make sure we haven't
                                    accidentally styled them by mistake.
                                </p>
                                <div className="mt-8 grid grid-cols-2 gap-6 items-start">
                                    <div className="grid grid-cols-1 gap-6">
                                        <label className="block">
                                            <span className="text-gray-700">Input (range)</span>
                                            <input type="range" className="mt-1 block w-full" />
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Input (color)</span>
                                            <input type="color" className="mt-1 block w-full" />
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Input (file)</span>
                                            <input type="file" className="mt-1 block w-full" />
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Input (file, multiple)</span>
                                            <input type="file" multiple className="mt-1 block w-full" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">Key Colors</h2>
                        <div className="grid grid-cols-2 md:grid-cols-9 gap-4">
                            <div className="p-4 rounded bg-contrast-600">Neutral</div>
                            <div className="p-4 rounded bg-ambient-600">Ambient</div>
                            <div className="p-4 rounded bg-primary">Primary</div>
                            <div className="p-4 rounded bg-secondary">Secondary</div>
                            <div className="p-4 rounded bg-tertiary">Tertiary</div>
                            <div className="p-4 rounded bg-info">Info</div>
                            <div className="p-4 rounded bg-error">Error</div>
                            <div className="p-4 rounded bg-warning">Warning</div>
                            <div className="p-4 rounded bg-success">Success</div>
                        </div>
                    </div>

                </section>
                <aside className="w-1/4">
                    <Disclosure label="Color wheel">
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-2 grow">
                                <Label label="Contrast colors" />
                                <ColorPalette>
                                    <ColorTone className="slate-500" />
                                    <ColorTone className="gray-500" />
                                    <ColorTone className="zinc-500" />
                                    <ColorTone className="neutral-500" />
                                    <ColorTone className="stone-500" />
                                </ColorPalette>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label label="Black & white" />
                                <ColorPalette>
                                    <ColorTone className="black" />
                                    <ColorTone className="white" />
                                </ColorPalette>
                            </div>
                        </div>
                        <Label label="Accent colors" />
                        <ColorPalette>
                            <ColorTone className="red-500" />
                            <ColorTone className="orange-500" />
                            <ColorTone className="amber-500" />
                            <ColorTone className="yellow-500" />
                            <ColorTone className="lime-500" />
                            <ColorTone className="green-500" />
                            <ColorTone className="emerald-500" />
                            <ColorTone className="teal-500" />
                            <ColorTone className="cyan-500" />
                            <ColorTone className="sky-500" />
                            <ColorTone className="blue-500" />
                            <ColorTone className="indigo-500" />
                            <ColorTone className="violet-500" />
                            <ColorTone className="purple-500" />
                            <ColorTone className="fuchsia-500" />
                            <ColorTone className="pink-500" />
                            <ColorTone className="rose-500" />
                        </ColorPalette>
                    </Disclosure>
                    <Disclosure label="Color Palette">
                        <Label label="Brand colors" />
                        <TonalPalette color="primary" />
                        <TonalPalette color="contrast" />
                        <Label label="Complementary colors" />
                        <TonalPalette color="ambient" />
                        <TonalPalette color="secondary" />
                        <TonalPalette color="tertiary" />
                        <Label label="Functional colors" />
                        <TonalPalette color="error" />
                        <TonalPalette color="warning" />
                        <TonalPalette color="success" />
                        <TonalPalette color="info" />
                    </Disclosure>
                    <Disclosure label="Color theme">
                        <Disclosure label="Base colors">
                            <Label label="Contrast colors" />
                            <ColorSwatch className="max-contrast" />
                            <ColorSwatch className="foreground" />
                            <ColorSwatch className="surface" />
                            <ColorSwatch className="background" />
                            <ColorSwatch className="min-contrast" />
                            <Label label="Fixed colors" />
                            <ColorSwatch className="lightest" />
                            <ColorSwatch className="darkest" />
                            <ColorSwatch className="clear" />
                            <ColorSwatch className="current" />
                        </Disclosure>
                        <Disclosure label="Tint colors">
                            <Label label="Foregounnd tints" />
                            <TintSwatch className="inverse" />
                            <TintSwatch className="heading" />
                            <TintSwatch className="text" />
                            <TintSwatch className="icon" />
                            <TintSwatch className="form" />
                            <TintSwatch className="decoration" />
                            <Label label="Decorative tints" />
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
                        <Disclosure label="Content colors">
                            <Label label="Text colors" />
                            <ColorSwatch className="text-heading" />
                            <ColorSwatch className="text-default" />
                            <ColorSwatch className="text-subtle" />
                            <ColorSwatch className="text-muted" />
                            <ColorSwatch className="text-disabled" />
                            <ColorSwatch className="text-hint" />
                            <Label label="Icon colors" />
                            <ColorSwatch className="icon-heading" />
                            <ColorSwatch className="icon-default" />
                            <ColorSwatch className="icon-subtle" />
                            <ColorSwatch className="icon-muted" />
                            <ColorSwatch className="icon-disabled" />
                            <ColorSwatch className="icon-hint" />
                            <Label label="Formn colors" />
                            <ColorSwatch className="form-filled" />
                            <ColorSwatch className="form-disabled" />
                            <ColorSwatch className="form-button" />
                            <ColorSwatch className="form-input" />
                            <ColorSwatch className="form-outline" />
                        </Disclosure>
                        <Disclosure label="Decorative colors">
                            <Label label="Highlight color" />
                            <ColorSwatch className="highlight" />
                            <Label label="Border colors" />
                            <ColorSwatch className="border" />
                            <ColorSwatch className="divider" />
                            <ColorSwatch className="line" />
                            <Label label="Shadow colors" />
                            <ColorSwatch className="shadow-soft" />
                            <ColorSwatch className="shadow" />
                            <ColorSwatch className="shadow-hard" />
                        </Disclosure>
                        <Disclosure label="Interactive colors">
                            <Label label="States" />
                            <ColorSwatch className="state-hover" />
                            <ColorSwatch className="state-focus" />
                            <ColorSwatch className="state-press" />
                            <ColorSwatch className="state-drag" />
                            <Label label="Interactivity" />
                            <ColorSwatch className="caret" />
                            <ColorSwatch className="active" />
                            <ColorSwatch className="accent" />
                            <ColorSwatch className="ring" />
                            <ColorSwatch className="selection" />
                            <Label label="Link" />
                            <ColorSwatch className="link" />
                            <ColorSwatch className="link-visited" />
                            <ColorSwatch className="link-hover" />
                            <ColorSwatch className="link-active" />
                        </Disclosure>
                        <Disclosure label="Surfaces colors">
                            <Label label="Surfaces" />
                            <ColorSwatch className="surface-dim" />
                            <ColorSwatch className="surface-bright" />
                            <ColorSwatch className="surface-lower" />
                            <ColorSwatch className="surface-low" />
                            <ColorSwatch className="surface-medium" />
                            <ColorSwatch className="surface-high" />
                            <ColorSwatch className="surface-higher" />
                            <Label label="Variant" />
                            <ColorSwatch className="variant-bright" />
                            <ColorSwatch className="variant" />
                            <ColorSwatch className="variant-dim" />
                            <Label label="Scrim" />
                            <ColorSwatch className="scrim-soft" />
                            <ColorSwatch className="scrim" />
                            <ColorSwatch className="scrim-hard" />
                        </Disclosure>
                        <Disclosure label="Addons colors">
                            <Label label="Status" />
                            <ColorSwatch className="alert" />
                            <ColorSwatch className="online" />
                            <ColorSwatch className="offline" />
                            <Label label="Charts" />
                            <ColorSwatch className="decrement" />
                            <ColorSwatch className="increment" />
                            <Label label="Sentiment" />
                            <ColorSwatch className="negative" />
                            <ColorSwatch className="intermediate" />
                            <ColorSwatch className="positive" />
                            <ColorSwatch className="neutral" />
                            <Label label="Commerce" />
                            <ColorSwatch className="new" />
                            <ColorSwatch className="promo" />
                            <ColorSwatch className="discount" />
                            <ColorSwatch className="gift" />
                            <ColorSwatch className="pay" />
                        </Disclosure>
                        <Disclosure label="Accent colors">
                            <Label label="Primary colors" />
                            <ColorSwatch className="primary-hardest" />
                            <ColorSwatch className="primary-harder" />
                            <ColorSwatch className="primary-hard" />
                            <ColorSwatch className="primary" />
                            <ColorSwatch className="primary-subtle" />
                            <ColorSwatch className="primary-subtler" />
                            <ColorSwatch className="primary-subtlest" />
                            <Label label="Secondary colors" />
                            <ColorSwatch className="secondary-hardest" />
                            <ColorSwatch className="secondary-harder" />
                            <ColorSwatch className="secondary-hard" />
                            <ColorSwatch className="secondary" />
                            <ColorSwatch className="secondary-subtle" />
                            <ColorSwatch className="secondary-subtler" />
                            <ColorSwatch className="secondary-subtlest" />
                            <Label label="Tertiary colors" />
                            <ColorSwatch className="tertiary-hardest" />
                            <ColorSwatch className="tertiary-harder" />
                            <ColorSwatch className="tertiary-hard" />
                            <ColorSwatch className="tertiary" />
                            <ColorSwatch className="tertiary-subtle" />
                            <ColorSwatch className="tertiary-subtler" />
                            <ColorSwatch className="tertiary-subtlest" />
                            <Label label="Error colors" />
                            <ColorSwatch className="error-hardest" />
                            <ColorSwatch className="error-harder" />
                            <ColorSwatch className="error-hard" />
                            <ColorSwatch className="error" />
                            <ColorSwatch className="error-subtle" />
                            <ColorSwatch className="error-subtler" />
                            <ColorSwatch className="error-subtlest" />
                            <Label label="Warning colors" />
                            <ColorSwatch className="warning-hardest" />
                            <ColorSwatch className="warning-harder" />
                            <ColorSwatch className="warning-hard" />
                            <ColorSwatch className="warning" />
                            <ColorSwatch className="warning-subtle" />
                            <ColorSwatch className="warning-subtler" />
                            <ColorSwatch className="warning-subtlest" />
                            <Label label="Success colors" />
                            <ColorSwatch className="success-hardest" />
                            <ColorSwatch className="success-harder" />
                            <ColorSwatch className="success-hard" />
                            <ColorSwatch className="success" />
                            <ColorSwatch className="success-subtle" />
                            <ColorSwatch className="success-subtler" />
                            <ColorSwatch className="success-subtlest" />
                            <Label label="Info colors" />
                            <ColorSwatch className="info-hardest" />
                            <ColorSwatch className="info-harder" />
                            <ColorSwatch className="info-hard" />
                            <ColorSwatch className="info" />
                            <ColorSwatch className="info-subtle" />
                            <ColorSwatch className="info-subtler" />
                            <ColorSwatch className="info-subtlest" />
                        </Disclosure>
                        <Disclosure label="Charts colors">
                            <Label label="Categorical" />
                            <ColorSwatch className="chart-1" />
                            <ColorSwatch className="chart-2" />
                            <ColorSwatch className="chart-3" />
                            <ColorSwatch className="chart-4" />
                            <ColorSwatch className="chart-5" />
                            <ColorSwatch className="chart-6" />
                            <ColorSwatch className="chart-7" />
                            <ColorSwatch className="chart-8" />
                            <ColorSwatch className="chart-9" />
                            <ColorSwatch className="chart-10" />
                            <Label label="Sequential" />
                            <ColorSwatch className="chart-seq-from" />
                            <ColorSwatch className="chart-seq-to" />
                            <Label label="Divergent" />
                            <ColorSwatch className="chart-div-start" />
                            <ColorSwatch className="chart-div-center" />
                            <ColorSwatch className="chart-div-end" />
                        </Disclosure>
                        <div className="hidden">
                            <Disclosure label="Components colors">
                                <Label label="Border colors" />
                                <ColorSwatch className="border-card" />
                                <ColorSwatch className="border-popover" />
                                <ColorSwatch className="border-dialog" />
                                <ColorSwatch className="border-tool" />
                                <ColorSwatch className="border-list" />
                                <ColorSwatch className="border-grid" />
                                <ColorSwatch className="border-layout" />
                                <Label label="Divider colors" />
                                <ColorSwatch className="divider-card" />
                                <ColorSwatch className="divider-popover" />
                                <ColorSwatch className="divider-dialog" />
                                <ColorSwatch className="divider-tool" />
                                <ColorSwatch className="divider-list" />
                                <ColorSwatch className="divider-grid" />
                                <ColorSwatch className="divider-layout" />
                                <Label label="Lines colors" />
                                <ColorSwatch className="line-table" />
                                <ColorSwatch className="line-chart" />
                                <Label label="Background colors" />
                                <ColorSwatch className="media" />
                                <ColorSwatch className="card" />
                                <ColorSwatch className="popover" />
                                <ColorSwatch className="dialog" />
                                <ColorSwatch className="tool" />
                            </Disclosure>
                        </div>
                    </Disclosure>
                    <Disclosure label="Shapes">
                        <Disclosure label="Base shapes">
                            <ShapeSwatch className="rounded-rect" />
                            <ShapeSwatch className="rounded-xs" />
                            <ShapeSwatch className="rounded-sm" />
                            <ShapeSwatch className="rounded-md" />
                            <ShapeSwatch className="rounded-lg" />
                            <ShapeSwatch className="rounded-xl" />
                            <ShapeSwatch className="rounded" />
                            <ShapeSwatch className="rounded-circle" />
                        </Disclosure>
                        <Disclosure label="Base elements">
                            <ShapeSwatch className="rounded-image" />
                            <ShapeSwatch className="rounded-input" />
                            <ShapeSwatch className="rounded-button" />
                            <ShapeSwatch className="rounded-card" />
                            <ShapeSwatch className="rounded-popover" />
                            <ShapeSwatch className="rounded-dialog" />
                            <ShapeSwatch className="rounded-tooltip" />
                        </Disclosure>
                        <Disclosure label="Base interfaces">
                            <Label label="Image based" />
                            <ShapeSwatch className="rounded-picture" />
                            <ShapeSwatch className="rounded-thumbnail" />
                            <ShapeSwatch className="rounded-avatar" />
                            <Label label="Form based" />
                            <ShapeSwatch className="rounded-option" />
                            <ShapeSwatch className="rounded-control" />
                            <ShapeSwatch className="rounded-handler" />
                            <Label label="Block based" />
                            <ShapeSwatch className="rounded-block" />
                            <ShapeSwatch className="rounded-section" />
                            <ShapeSwatch className="rounded-dropdown" />
                            <ShapeSwatch className="rounded-modal" />
                            <ShapeSwatch className="rounded-alert" />
                        </Disclosure>
                        <Disclosure label="Layout regions">
                            <ShapeSwatch className="rounded-toolbar" />
                            <ShapeSwatch className="rounded-header" />
                            <ShapeSwatch className="rounded-footer" />
                            <ShapeSwatch className="rounded-sidebar" />
                            <ShapeSwatch className="rounded-content" />
                        </Disclosure>
                    </Disclosure>
                </aside>
            </main>

        </div>
    );
}