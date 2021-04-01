import React from 'react';

interface SpritePartInfo {
    collectionNo: number;
    name: string;
    rarity: number;
    icon: string;
    bg_front?: string;
    bg: string;
    body_front?: string;
    body_middle: string;
    body_back?: string;
    body_back2?: string;
    head_front: string;
    head_back?: string;
}

interface IProps { };
interface IState {
    entries: SpritePartInfo[];
};

export default class extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            entries: []
        }
    }

    componentDidMount() {
        fetch('https://assets.atlasacademy.io/GameData/JP/FFOSpriteParts/FFOSpriteParts.json')
            .then(res => res.json())
            .then(_ => this.setState({ entries: _ }));
    }

    endpoint = 'https://assets.atlasacademy.io/GameData/JP/FFOSpriteParts/';

    render() {
        return (
            <div>
                {this.state.entries.slice(0, 10).map(
                    entry => (
                        <div style={{ position: 'relative' }}>
                            {entry.bg && <img src={this.endpoint + entry.bg} style={{ position: 'relative', zIndex: -1 }} />}
                            {[
                                entry.bg_front,
                                entry.body_back2,
                                entry.body_back,
                                entry.head_back,
                                entry.body_middle,
                                entry.body_front,
                                entry.head_front
                            ].map((a, i) => a && <img src={this.endpoint + a} style={{ position: 'absolute', width: 512, top: 0, left: 0, zIndex: i }} />)}
                        </div>
                    )
                )}
            </div>
        )
    }
}