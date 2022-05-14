import { defineStore } from 'pinia';

export interface ListItem {
	title: string;
	text: string;
}

export interface State {
	listItems: ListItem[];
}

export const useStore = defineStore('main', {
	state: (): State => {
		return {
			listItems: [
				{
					title: 'Title 1',
					text: 'Text 1',
				},
				{
					title: 'Title 2',
					text: 'Text 2',
				},
			],
		};
	},
	getters: {},
	actions: {
		addItem() {
			this.listItems.push({
				title: `Title ${this.listItems.length + 1}`,
				text: `Text ${this.listItems.length + 1}`,
			});
		},
	},
});
