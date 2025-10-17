import React from 'react';

import { CardContacts } from '@/components/demo/card-contacts';
import { CardOptions } from '@/components/demo/card-options';
import { ToolPlayer } from '@/components/demo/tool-player';
import { ListOptions } from '@/components/demo/list-options';
import { FormField } from '@/components/demo/form-field';
import { FormToggle } from '@/components/demo/form-toggle';
import { ModalSearch } from '@/components/demo/modal-search';
import { DropdownTheme } from '@/components/demo/dropdown-theme';
import { BarNavigation } from '@/components/demo/bar-navigation';
import { Button } from '@/components/primitives/Button';
import { Switch } from '@/components/primitives/Switch';

const HeroSection = () => {
    return (
        <div className="relative -mt-[5.75rem] overflow-hidden pb-16 pt-[9rem] _px-8">
            <div className="relative mx-auto mt-16 grid w-full max-w-7xl grid-cols-1 px-4 sm:mt-20 sm:px-6 lg:px-8 xl:mt-32">
                <div className="box-image col-start-1 row-start-1 h-7 text-base/7 font-semibold text-sky-500" aria-hidden="true">
                    For the users of Tailwind CSS
                </div>
                <h1 className="col-start-1 row-start-2 mt-4 max-w-[36rem] text-4xl font-extrabold tracking-tight text-default sm:text-7xl xl:max-w-[43.5rem]">
                    Build your <mark>next idea</mark> <span className="underline decoration-primary">freaking</span> faster.
                </h1>
                <p className="col-start-1 row-start-3 mt-4 max-w-lg text-lg text-subtle">
                    Beautifully designed, expertly crafted components and templates, built by the makers of Tailwind CSS. The perfect starting point for your next project.
                </p>
                <div className="col-start-1 row-start-4 mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <a className="radius-none inline-flex justify-center rounded-button text-sm font-semibold py-3 px-4 bg-filled text-min-contrast hover:bg-slate-700" href="/components">
                        <span>Browse components <span aria-hidden="true" className="hidden text-slate-400 sm:inline">→</span></span>
                    </a>
                    <a className="inline-flex justify-center rounded-button text-sm font-semibold py-3 px-4 text-default ring-1 ring-outline hover:bg-surface/25 hover:ring-slate-900/15 " href="/templates">
                        <span>Explore templates <span aria-hidden="true" className="hidden text-black/25 sm:inline">→</span></span>
                    </a>
                </div>
                <div className="pointer-events-none_ col-start-1 row-start-5 flex md:row-span-3 md:row-start-3 lg:row-span-4 lg:row-start-2 xl:row-span-5 xl:row-start-1 xl:justify-end">
                    <div className="-ml-[32rem] mt-12 h-[46.375rem] origin-top-right scale-[calc(204/299)] select-none sm:-ml-[24rem] sm:-mt-20 sm:h-auto sm:transform-none md:-ml-64 md:mt-10 lg:-ml-16 lg:mt-0 xl:-mr-4 xl:ml-0">
                        <div className="flex justify-end">
                            <div className="relative flex items-end">
                                <div className="absolute -inset-x-8 bottom-0 h-px bg-line-hard [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
                                <div className="absolute left-16 top-full -mt-px h-8 overflow-hidden">
                                    <div className="flex -mt-px h-[2px] w-56">
                                        <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
                                        <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="p-4">
                                        <Switch checked={true} className="ml-auto" />
                                        <div className="mt-8 flex items-center justify-end">
                                            <Switch />
                                            <Button.Filled className="ml-8">Button A</Button.Filled>
                                        </div>
                                    </div>
                                    <div className="relative z-10 p-4 text-right">
                                        <div className="absolute -inset-y-8 left-0 w-px bg-line-hard [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
                                        <div className="absolute -inset-x-8 top-0 h-px bg-line-hard [mask-image:linear-gradient(to_left,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
                                        <div className="absolute inset-0 -right-px bg-gradient-to-br from-white/0 via-white/25 to-white/0"></div>
                                        <Button.Segmented label="12k">
                                            <svg className="mr-2.5 size-5 flex-none fill-icon-default">
                                                <path d="M5 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14l-5-2.5L5 18V4Z"></path>
                                            </svg>
                                            Bookmark
                                        </Button.Segmented>
                                    </div>
                                </div>
                                <div className="relative z-10 p-4">
                                    <div className="absolute -inset-y-8 right-0 w-px bg-line-hard [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
                                    <div className="absolute -inset-y-8 left-0 w-px bg-line-hard [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
                                    <div className="absolute -inset-x-8 top-0 h-px bg-line-hard [mask-image:linear-gradient(to_left,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
                                    <div className="absolute bottom-full left-40 -mb-px flex h-8 items-end overflow-hidden">
                                        <div className="flex -mb-px h-[2px] w-56">
                                            <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
                                            <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
                                        </div>
                                    </div>
                                    <CardContacts className="w-[24.5rem]" />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="relative z-10 p-4">
                                <ToolPlayer />
                            </div>
                        </div>
                        <div className="flex items-start justify-end">
                            <div>
                                <div className="relative flex items-end justify-end">
                                    <div className="absolute -inset-x-8 bottom-0 h-px bg-line-hard [mask-image:linear-gradient(to_left,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
                                    <div>
                                        <div className="flex justify-end p-4">
                                            <FormToggle />
                                        </div>
                                        <div className="relative z-10 p-4">
                                            <div className="absolute -inset-x-8 top-0 h-px bg-line-hard [mask-image:linear-gradient(to_left,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
                                            <div className="absolute -inset-y-8 left-0 w-px bg-line-hard [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
                                            <div className="absolute -inset-y-8 right-0 w-px bg-line-hard [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
                                            <div className="absolute bottom-full left-16 -mb-px flex h-8 items-end overflow-hidden">
                                                <div className="flex -mb-px h-[2px] w-56">
                                                    <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
                                                    <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
                                                </div>
                                            </div>
                                            <BarNavigation />
                                        </div>
                                    </div>
                                    <div className="relative z-10 p-4">
                                        <ListOptions />
                                    </div>
                                </div>
                                <div className="flex items-start justify-end">
                                    <div className="relative p-4">
                                        <div className="absolute -inset-y-8 left-0 w-px bg-line-hard [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
                                        <div className="absolute -inset-x-8 bottom-0 h-px bg-line-hard [mask-image:linear-gradient(to_left,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
                                        <DropdownTheme />
                                    </div>
                                    <div className="relative p-4">
                                        <div className="absolute -inset-y-8 right-0 w-px bg-line-hard [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
                                        <div className="absolute -inset-y-8 left-0 w-px bg-line-hard [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
                                        <div className="absolute -inset-x-8 bottom-0 h-px bg-line-hard [mask-image:linear-gradient(to_left,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
                                        <div className="absolute -top-px right-16 h-8 overflow-hidden">
                                            <div className="flex -mt-px h-[2px] w-56 -scale-x-100">
                                                <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
                                                <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
                                            </div>
                                        </div>
                                        <FormField />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="relative p-4">
                                    <ModalSearch />
                                </div>
                                <div className="relative p-4">
                                    <CardOptions />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
