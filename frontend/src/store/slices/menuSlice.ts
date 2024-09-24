import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuState {
	selectedMenuId: string | null;
}

const initialState: MenuState = {
	selectedMenuId: null,
};

const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		selectMenu: (state, action: PayloadAction<string>) => {
			state.selectedMenuId = action.payload;
		},
		clearSelectedMenu: (state) => {
			state.selectedMenuId = null;
		},
	},
});

export const { selectMenu, clearSelectedMenu } = menuSlice.actions;
export default menuSlice.reducer;
