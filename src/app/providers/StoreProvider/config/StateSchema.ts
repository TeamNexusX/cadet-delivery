import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByEmail';
import {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { UISchema } from 'features/UI';
import { ProductsSchema } from 'pages/ShopPage';
import { BasketSchema } from 'entities/Basket';
import { OrderSchema } from 'entities/Order';
import { OrdersSchema } from 'pages/OrdersPage';

export interface StateSchema {
    user: UserSchema;
    ui: UISchema

    // asynchronous reducers
    loginForm?: LoginSchema;
    Products?: ProductsSchema;
    Basket?: BasketSchema;
    Order?: OrderSchema
    Orders?: OrdersSchema
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>
export interface reducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: reducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
