import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

export type Id = number;


// ENTITIES in out system:
/*
   - user
   - task
   - period
   -



 */


export interface Entity {
    id: Id;
    type: string;
}

export interface ValueEntity extends Entity {
    value: unknown; // idk for now
}

export interface Interface {
    type: Id;
    multiple: boolean; // can be array or not
}

export interface InputInterface extends Interface {
    default: Entity;
}

export enum WidgetParamTypes {
    NUMBER,
    STRING,
    BOOLEAN,
    ENTITY
}

export interface WidgetParam {
    type: WidgetParamTypes;
    value: unknown;
    multiple: boolean;
}

export interface Widget {
    id: Id;
    params: Record<string, WidgetParam>
    // params?
    inputs: InputInterface;
    outputs?: Interface;
}

export interface WidgetLink {
    from: Id;
    to: Id;
}

export interface CustomPageLayout {
    id: Id; // mb uuid
    widgets: Widget[],
    links?: WidgetLink[],
}

// in backend we will have api for entities
// api/entities/user
// api/entities/status
// api/entities/epic


function CustomPage() {
    let { pageId } = useParams();

    const [test, setTest] = useState('init');

    useEffect(() => {
        // ... load data ...
        const loadedConfig: CustomPageLayout = {
            id: 1,
            widgets: [],
            links: [],
        }

        // we have entities in the backend: task, user,

        const config = {
            id: 111, // uuid

            // widgets can have no inputs: users list, status list, epics list - basically the input is this project but for now let's omit that
            // so left widget is users list
            // right widget is epics list

            // the sprint view accepts 2 inputs, one of entity user and one of entity epic

            // widgets are preconfigured, but every widget can be additionally configured:
            // single or multiple values for each input - YES
            // is the type configurable or not? i think for now NO
            // maybe later combine multiple sources into one input or smth


            widgets: [
                //
                {
                    id: 222,
                    outputs: [
                        {
                            type: 'string',
                            multiple: false,
                        }
                    ]
                },
                {
                    id: 123, // uuid
                    inputs: [
                        {
                            type: 'string',
                            multiple: false,
                        }
                    ],
                    outputs: [
                        {
                            type: 'entity',
                            //entity_type?: 'user-entity-uuid
                            multiple: false
                        }
                    ]
                },
                {
                    id: 890, // uuid
                    outputs: [
                        {
                            type: 'epic-entity-uuid',
                            multiple: true
                        }
                    ]
                },
                {
                    id: 456, // uuid
                    input: [
                        {
                            type: 'user-entity-uuid',
                            multiple: false,
                        },
                        {
                            type: 'epic-entity-uuid',
                            multiple: true,
                        }
                    ]
                }
            ],
            links: [
                {
                    from: 222,
                    to: 123,
                },
                {
                    from: 123, // uuid
                    to: 456, // uuid
                },
                {
                    from: 789, // uuid
                    to: 456 // uuid
                }
            ]
        }

        console.log(`make request to get config: ${pageId} ${test}`);
    }, [pageId]);

    return <>
        <span>{ test }</span>
        <span onClick={() => setTest('cool')}>{ pageId }</span>
        <Link relative='path' to={'../other'}>LLL</Link>
    </>
}

export default CustomPage;
