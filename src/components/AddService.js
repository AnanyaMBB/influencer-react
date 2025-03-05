import "./AddService.css";
import { useState, useRef } from "react";
import { baseUrl } from "../shared";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button'; 
// import { PropertyDescriptorParsingType } from "html2canvas/dist/types/css/IPropertyDescriptor";

export default function AddService(props) {
    const [closed, setClosed] = useState(true);
    const [serviceName, setServiceName] = useState();
    const [serviceType, setServiceType] = useState("feed");
    const [postType, setPostType] = useState("Image");
    const [postLength, setPostLength] = useState();

    // const [pricingSetting, setPricingSetting] = useState({
    //     "feed": {"hourly": [0, true], "view": [0, true], "like": [0, true]}, 
    //     "story": {"hourly": [0, true], "view": [0, true], "like": [0, true]}, 
    //     "live": {"hourly": [0, true], "view": [0, true], "like": [0, true]}, 
    // });

    const [pricingSetting, setPricingSetting] = useState({
        "feed_influencer": {"daily": [0, true], "view": [0, true], "like": [0, true]}, 
        "feed_business": {"daily": [0, true], "view": [0, true], "like": [0, true]}, 
        // "story": {"hourly": [0, true], "view": [0, true], "like": [0, true]}, 
        // "live": {"hourly": [0, true], "view": [0, true], "like": [0, true]}, 
    });

    const [contentProvider, setContentProvider] = useState({
        "feed": {"business": true, "influencer": true},
        "story": {"business": true, "influencer": true},
        "live": {"business": true, "influencer": true},
    });

    const stepperRef = useRef(null);


    // Add Influencer Service 
    function addInfluencerService() {
        const url = baseUrl + `api/influencer/service/add?account_id=${props.selectedAccount}`;
        let postData = [
            // Feed Data
            {"service_type": "feed", "pricing_method": "daily", "pricing_method_activated": true, "price": pricingSetting.feed_influencer.daily[0], "content_provider": "influencer"},
            {"service_type": "feed", "pricing_method": "daily", "pricing_method_activated": true, "price": pricingSetting.feed_business.daily[0], "content_provider": "business"},
            // {"service_type": "feed", "pricing_method": "view", "pricing_method_activated": pricingSetting.feed.view[1], "price": pricingSetting.feed.view[0], "content_provider_business": contentProvider.feed.business, "content_provider_influencer": contentProvider.feed.influencer},
            // {"service_type": "feed", "pricing_method": "live", "pricing_method_activated": pricingSetting.feed.like[1], "price": pricingSetting.feed.like[0], "content_provider_business": contentProvider.feed.business, "content_provider_influencer": contentProvider.feed.influencer},
            // //Story Data
            // {"service_type": "story", "pricing_method": "hourly", "pricing_method_activated": pricingSetting.story.hourly[1], "price": pricingSetting.story.hourly[0], "content_provider_business": contentProvider.story.business, "content_provider_influencer": contentProvider.story.influencer},
            // {"service_type": "story", "pricing_method": "view", "pricing_method_activated": pricingSetting.story.view[1], "price": pricingSetting.story.view[0], "content_provider_business": contentProvider.story.business, "content_provider_influencer": contentProvider.story.influencer},
            // {"service_type": "story", "pricing_method": "live", "pricing_method_activated": pricingSetting.story.like[1], "price": pricingSetting.story.like[0], "content_provider_business": contentProvider.story.business, "content_provider_influencer": contentProvider.story.influencer},
            // // Live Data
            // {"service_type": "live", "pricing_method": "hourly", "pricing_method_activated": pricingSetting.live.hourly[1], "price": pricingSetting.live.hourly[0], "content_provider_business": contentProvider.live.business, "content_provider_influencer": contentProvider.live.influencer},
            // {"service_type": "live", "pricing_method": "view", "pricing_method_activated": pricingSetting.live.view[1], "price": pricingSetting.live.view[0], "content_provider_business": contentProvider.live.business, "content_provider_influencer": contentProvider.live.influencer},
            // {"service_type": "live", "pricing_method": "live", "pricing_method_activated": pricingSetting.live.like[1], "price": pricingSetting.live.like[0], "content_provider_business": contentProvider.live.business, "content_provider_influencer": contentProvider.live.influencer},
        ];

        fetch(url, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            }, 
            body: JSON.stringify(postData),
        })
        .then((response) => {
            if(!response.ok)
                throw new Error("Adding Service Failed");
            return response.json()
        })
        .then((data) => {

        })
        .catch((error) => {})
    }

    

    return (
        <>
            <button
                className="overlay-trigger"
                onClick={() => {
                    setClosed(!closed);
                }}
            >
                {/* Service Settings */}
                <i className="pi pi-cog"></i>
            </button>
            <div
                className={
                    closed == false
                        ? "new-service-form"
                        : "new-service-form display-none-property"
                }
            >
                <div className="header">
                    <div className="title">
                        <p>Add Service</p>
                    </div>
                    <div
                        className="close" 
                        onClick={() => {
                            setClosed(true);
                        }}
                    >
                        <span class="material-symbols-outlined">close</span>
                    </div>
                </div>
                <div className="body">
                    <div className="feed-post-service">
                        <div className="service-content feed">
                            <div className="pricings">
                                <div className="pricings-header">
                                    <span>Pricings</span>
                                </div>
                                <div className="content-source">
                                    <div className="source-header">
                                        <span>Content Source</span>
                                    </div>
                                    <div className="source-content">
                                        <span>Influencer</span>
                                    </div>
                                </div>
                                <div className="pricings-content">
                                    
                                    <div className="hourly">
                                        <div className="pricing-header">
                                            <label>Price Per Day</label>
                                            {/* <input type="checkbox" checked={pricingSetting.feed.hourly[1] ? true : false} onChange={(e) => {
                                                setPricingSetting((prevSetting) => ({
                                                    ...prevSetting, 
                                                    "feed": {
                                                        ...prevSetting.feed, 
                                                        "hourly": [prevSetting.feed.hourly[0], e.target.checked]
                                                    }
                                                }))
                                            }}/> */}
                                        </div>
                                        <input
                                            type="number"
                                            value={pricingSetting.feed_influencer.daily[0]}
                                            onChange={(e) => setPricingSetting((prevSetting) => ({
                                                ...prevSetting, 
                                                "feed_influencer": {
                                                    ...prevSetting.feed_influencer, 
                                                    "daily": [e.target.value, true]
                                                }
                                            }))}
                                        />
                                    </div>
                                </div>
                                <div className="content-source business">
                                    <div className="source-header">
                                        <span>Content Source</span>
                                    </div>
                                    <div className="source-content">
                                        <span>Business</span>
                                    </div>
                                </div>
                                <div className="pricings-content">
                                    
                                    <div className="hourly">
                                        <div className="pricing-header">
                                            <label>Price Per Day</label>
                                            {/* <input type="checkbox" checked={pricingSetting.feed.hourly[1] ? true : false} onChange={(e) => {
                                                setPricingSetting((prevSetting) => ({
                                                    ...prevSetting, 
                                                    "feed": {
                                                        ...prevSetting.feed, 
                                                        "hourly": [prevSetting.feed.hourly[0], e.target.checked]
                                                    }
                                                }))
                                            }}/> */}
                                        </div>
                                        <input
                                            type="number"
                                            value={pricingSetting.feed_business.daily[0]}
                                            onChange={(e) => setPricingSetting((prevSetting) => ({
                                                ...prevSetting, 
                                                "feed_business": {
                                                    ...prevSetting.feed_business, 
                                                    "daily": [e.target.value, true]
                                                }
                                            }))}
                                        />
                                    </div>
                                </div>
                                <div className="service-setup-action">
                                    <button className="add-service-button" onClick={() => {addInfluencerService()}}>Add Service</button>
                                </div>
                                
                            </div>
                        </div>
                        <div className="control-buttons">
                            {/* <Button className="empty-button" />
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} /> */}
                        </div>
                    </div>
                </div>
                {/* <div className="body">
                    <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
                        <StepperPanel header="Feed Post">
                            <div className="service-content feed">
                                <div className="pricings">
                                    <div className="pricings-header">
                                        <span>Pricings</span>
                                    </div>
                                    <div className="pricings-content">
                                        <div className="hourly">
                                            <div className="pricing-header">
                                                <label>Hourly Price</label>
                                                <input type="checkbox" checked={pricingSetting.feed.hourly[1] ? true : false} onChange={(e) => {
                                                    setPricingSetting((prevSetting) => ({
                                                        ...prevSetting, 
                                                        "feed": {
                                                            ...prevSetting.feed, 
                                                            "hourly": [prevSetting.feed.hourly[0], e.target.checked]
                                                        }
                                                    }))
                                                }}/>
                                            </div>
                                            <input
                                                type="number"
                                                value={pricingSetting.feed.hourly[0]}
                                                onChange={(e) => setPricingSetting((prevSetting) => ({
                                                    ...prevSetting, 
                                                    "feed": {
                                                        ...prevSetting.feed, 
                                                        "hourly": [e.target.value, true]
                                                    }
                                                }))}
                                            />
                                        </div>
                                        <div className="view">
                                            <div className="pricing-header">
                                                <label>View Price</label>
                                                <input type="checkbox" checked={pricingSetting.feed.view[1] ? true : false} onChange={(e) => {
                                                    setPricingSetting((prevSetting) => ({
                                                        ...prevSetting, 
                                                        "feed": {
                                                            ...prevSetting.feed, 
                                                            "view": [prevSetting.feed.view[0], e.target.checked]
                                                        }
                                                    }))
                                                }}/>
                                            </div>
                                            <input
                                                type="number"
                                                value={pricingSetting.feed.view[0]}
                                                onChange={(e) => setPricingSetting((prevSetting) => ({
                                                    ...prevSetting, 
                                                    "feed": {
                                                        ...prevSetting.feed, 
                                                        "view": [e.target.value, true]
                                                    }
                                                }))}
                                            />
                                        </div>
                                        <div className="like">
                                            <div className="pricing-header">
                                                <label>Like Price</label>
                                                <input type="checkbox" checked={pricingSetting.feed.like[1] ? true : false} onChange={(e) => {
                                                    setPricingSetting((prevSetting) => ({
                                                        ...prevSetting, 
                                                        "feed": {
                                                            ...prevSetting.feed, 
                                                            "like": [prevSetting.feed.like[0], e.target.checked]
                                                        }
                                                    }))
                                                }}/>
                                            </div>
                                            <input
                                                type="number"
                                                value={pricingSetting.feed.like[0]}
                                                onChange={(e) => setPricingSetting((prevSetting) => ({
                                                    ...prevSetting, 
                                                    "feed": {
                                                        ...prevSetting.feed, 
                                                        "like": [e.target.value, true]
                                                    }
                                                }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="content-source">
                                    <div className="content-source-header">
                                        <span>Content Source</span>
                                    </div>
                                    <div className="content-source-content">
                                        <div className="source">
                                            <label>Influencer</label>
                                            <input type="checkbox" checked={contentProvider.feed.influencer} onChange={(e) => {
                                                setContentProvider((prevContentProvider) => ({
                                                    ...prevContentProvider, 
                                                    "feed": {
                                                        ...prevContentProvider.feed, 
                                                        "influencer": e.target.checked
                                                    }
                                                }))
                                            }}/>
                                        </div>
                                        <div className="source">
                                            <label>Business</label>
                                            <input type="checkbox" checked={contentProvider.feed.business} onChange={(e) => {
                                                setContentProvider((prevContentProvider) => ({
                                                    ...prevContentProvider, 
                                                    "feed": {
                                                        ...prevContentProvider.feed, 
                                                        "business": e.target.checked
                                                    }
                                                }))
                                            }}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="control-buttons">
                                <Button className="empty-button" />
                                <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                            </div>
                        </StepperPanel>
                        <StepperPanel header="Story Post">
                            <div className="service-content story">
                                <div className="pricings">
                                    <div className="pricings-header">
                                        <span>Pricings</span>
                                    </div>
                                    <div className="pricings-content">
                                        <div className="hourly">
                                            <div className="pricing-header">
                                                <label>Hourly Price</label>
                                                <input type="checkbox" checked={pricingSetting.story.hourly[1] ? true : false} onChange={(e) => {
                                                    setPricingSetting((prevSetting) => ({
                                                        ...prevSetting, 
                                                        "story": {
                                                            ...prevSetting.story, 
                                                            "hourly": [prevSetting.story.hourly[0], e.target.checked]
                                                        }
                                                    }))
                                                }}/>
                                            </div>
                                            <input
                                                type="number"
                                                value={pricingSetting.story.hourly[0]}
                                                onChange={(e) => setPricingSetting((prevSetting) => ({
                                                    ...prevSetting, 
                                                    "story": {
                                                        ...prevSetting.story, 
                                                        "hourly": [e.target.value, true]
                                                    }
                                                }))}
                                            />
                                        </div>
                                        <div className="view">
                                            <div className="pricing-header">
                                                <label>View Price</label>
                                                <input type="checkbox" checked={pricingSetting.story.view[1] ? true : false} onChange={(e) => {
                                                    setPricingSetting((prevSetting) => ({
                                                        ...prevSetting, 
                                                        "story": {
                                                            ...prevSetting.story, 
                                                            "view": [prevSetting.story.view[0], e.target.checked]
                                                        }
                                                    }))
                                                }}/>
                                            </div>
                                            <input
                                                type="number"
                                                value={pricingSetting.story.view[0]}
                                                onChange={(e) => setPricingSetting((prevSetting) => ({
                                                    ...prevSetting, 
                                                    "story": {
                                                        ...prevSetting.story, 
                                                        "view": [e.target.value, true]
                                                    }
                                                }))}
                                            />
                                        </div>
                                        <div className="like">
                                            <div className="pricing-header">
                                                <label>Like Price</label>
                                                <input type="checkbox" checked={pricingSetting.story.like[1] ? true : false} onChange={(e) => {
                                                    setPricingSetting((prevSetting) => ({
                                                        ...prevSetting, 
                                                        "story": {
                                                            ...prevSetting.story, 
                                                            "like": [prevSetting.story.like[0], e.target.checked]
                                                        }
                                                    }))
                                                }}/>
                                            </div>
                                            <input
                                                type="number"
                                                value={pricingSetting.story.like[0]}
                                                onChange={(e) => setPricingSetting((prevSetting) => ({
                                                    ...prevSetting, 
                                                    "story": {
                                                        ...prevSetting.story, 
                                                        "like": [e.target.value, true]
                                                    }
                                                }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="content-source">
                                    <div className="content-source-header">
                                        <span>Content Source</span>
                                    </div>
                                    <div className="content-source-content">
                                        <div className="source">
                                            <label>Influencer</label>
                                            <input type="checkbox" checked={contentProvider.story.influencer} onChange={(e) => {
                                                setContentProvider((prevContentProvider) => ({
                                                    ...prevContentProvider, 
                                                    "story": {
                                                        ...prevContentProvider.story, 
                                                        "influencer": e.target.checked
                                                    }
                                                }))
                                            }}/>
                                        </div>
                                        <div className="source">
                                            <label>Business</label>
                                            <input type="checkbox" checked={contentProvider.story.business} onChange={(e) => {
                                                setContentProvider((prevContentProvider) => ({
                                                    ...prevContentProvider, 
                                                    "story": {
                                                        ...prevContentProvider.story, 
                                                        "business": e.target.checked
                                                    }
                                                }))
                                            }}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="control-buttons">
                                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                                <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                            </div>
                        </StepperPanel>
                        <StepperPanel header="Live Post">
                            <div className="service-content live">
                                <div className="pricings">
                                    <div className="pricings-header">
                                        <span>Pricings</span>
                                    </div>
                                    <div className="pricings-content">
                                        <div className="hourly">
                                            <div className="pricing-header">
                                                <label>Hourly Price</label>
                                                <input type="checkbox" checked={pricingSetting.live.hourly[1] ? true : false} onChange={(e) => {
                                                    setPricingSetting((prevSetting) => ({
                                                        ...prevSetting, 
                                                        "live": {
                                                            ...prevSetting.live, 
                                                            "hourly": [prevSetting.live.hourly[0], e.target.checked]
                                                        }
                                                    }))
                                                }}/>
                                            </div>
                                            <input
                                                type="number"
                                                value={pricingSetting.live.hourly[0]}
                                                onChange={(e) => setPricingSetting((prevSetting) => ({
                                                    ...prevSetting, 
                                                    "live": {
                                                        ...prevSetting.live, 
                                                        "hourly": [e.target.value, true]
                                                    }
                                                }))}
                                            />
                                        </div>
                                        <div className="view">
                                            <div className="pricing-header">
                                                <label>View Price</label>
                                                <input type="checkbox" checked={pricingSetting.live.view[1] ? true : false} onChange={(e) => {
                                                    setPricingSetting((prevSetting) => ({
                                                        ...prevSetting, 
                                                        "live": {
                                                            ...prevSetting.live, 
                                                            "view": [prevSetting.live.view[0], e.target.checked]
                                                        }
                                                    }))
                                                }}/>
                                            </div>
                                            <input
                                                type="number"
                                                value={pricingSetting.live.view[0]}
                                                onChange={(e) => setPricingSetting((prevSetting) => ({
                                                    ...prevSetting, 
                                                    "live": {
                                                        ...prevSetting.live, 
                                                        "view": [e.target.value, true]
                                                    }
                                                }))}
                                            />
                                        </div>
                                        <div className="like">
                                            <div className="pricing-header">
                                                <label>Like Price</label>
                                                <input type="checkbox" checked={pricingSetting.live.like[1] ? true : false} onChange={(e) => {
                                                    setPricingSetting((prevSetting) => ({
                                                        ...prevSetting, 
                                                        "live": {
                                                            ...prevSetting.live, 
                                                            "like": [prevSetting.live.like[0], e.target.checked]
                                                        }
                                                    }))
                                                }}/>
                                            </div>
                                            <input
                                                type="number"
                                                value={pricingSetting.live.like[0]}
                                                onChange={(e) => setPricingSetting((prevSetting) => ({
                                                    ...prevSetting, 
                                                    "live": {
                                                        ...prevSetting.live, 
                                                        "like": [e.target.value, true]
                                                    }
                                                }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="content-source">
                                    <div className="content-source-header">
                                        <span>Content Source</span>
                                    </div>
                                    <div className="content-source-content">
                                        <div className="source">
                                            <label>Influencer</label>
                                            <input type="checkbox" checked={contentProvider.live.influencer} onChange={(e) => {
                                                setContentProvider((prevContentProvider) => ({
                                                    ...prevContentProvider, 
                                                    "live": {
                                                        ...prevContentProvider.live, 
                                                        "influencer": e.target.checked
                                                    }
                                                }))
                                            }}/>
                                        </div>
                                        <div className="source">
                                            <label>Business</label>
                                            <input type="checkbox" checked={contentProvider.live.business} onChange={(e) => {
                                                setContentProvider((prevContentProvider) => ({
                                                    ...prevContentProvider, 
                                                    "live": {
                                                        ...prevContentProvider.live, 
                                                        "business": e.target.checked
                                                    }
                                                }))
                                            }}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="control-buttons">
                                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                                <Button label="Save" severity="secondary" icon="pi pi-save" onClick={() => {addInfluencerService()}} />
                            </div>
                        </StepperPanel>
                    </Stepper>
                </div> */}
            </div>
        </>
    );
}
