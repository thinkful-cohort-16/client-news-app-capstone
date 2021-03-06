import { API_BASE_URL } from '../config';

export const FETCH_COLLECTIONS_REQUEST = "FETCH_COLLECTIONS_REQUEST";
export const fetchCollectionsRequest = () => {
  return {
    type: FETCH_COLLECTIONS_REQUEST,
    loading: true,
    error: null
  }
}

export const FETCH_COLLECTIONS_SUCCESS = "FETCH_COLLECTIONS_SUCCESS";
export const fetchCollectionsSuccess = (collections) => {
  return {
		type: FETCH_COLLECTIONS_SUCCESS,
		loading: false,
		error: null,
		collections
  }
}

export const FETCH_COLLECTIONS_ERROR = "FETCH_COLLECTIONS_ERROR";
export const fetchCollectionsError = (error) => {
	return {
		type: FETCH_COLLECTIONS_ERROR,
		loading: false,
		error
	}
}

export const CREATE_COLLECTION_REQUEST = "CREATE_COLLECTION_REQUEST";
export const createCollectionRequest = () => {
  return {
    type: CREATE_COLLECTION_REQUEST,
    loading: true,
    error: null
  }
}

export const CREATE_COLLECTION_SUCCESS = "CREATE_COLLECTION_SUCCESS";
export const createCollectionSuccess = (collectionName) => {
  return {
		type: CREATE_COLLECTION_SUCCESS,
		loading: false,
		error: null,
		collectionName
  }
}

export const CREATE_COLLECTION_ERROR = "CREATE_COLLECTION_ERROR";
export const createCollectionError = (error) => {
	return {
		type: CREATE_COLLECTION_ERROR,
		loading: false,
		error
	}
}

export const ADD_TO_COLLECTION_REQUEST = "ADD_TO_COLLECTION_REQUEST";
export const addToCollectionRequest = () => {
	return {
		type: ADD_TO_COLLECTION_REQUEST,
		loading: true,
		error: false
	}
}

export const ADD_TO_COLLECTION_SUCCESS = "ADD_TO_COLLECTION_SUCCESS";
export const addToCollectionSuccess = (data) => {
	return {
		type: ADD_TO_COLLECTION_SUCCESS,
		loading: false,
		collectionId: data.collectionId,
		article: data.article
	}
}

export const ADD_TO_COLLECTION_ERROR = "ADD_TO_COLLECTION_ERROR";
export const addToCollectionError = (error) => {
	return {
		type: ADD_TO_COLLECTION_ERROR,
		loading: false,
		error
	}
}

export const RENAME_COLLECTION_REQUEST = "RENAME_COLLECTION_REQUEST";
export const renameCollectionRequest = () => {
	return {
		type: RENAME_COLLECTION_REQUEST,
		loading: true,
		error: null
	}
}

export const RENAME_COLLECTION_SUCCESS = "RENAME_COLLECTION_SUCCESS";
export const renameCollectionSuccess = () => {
	return {
		type: RENAME_COLLECTION_SUCCESS,
		loading: false,
		error: null
	}
}

export const RENAME_COLLECTION_ERROR = "RENAME_COLLECTION_ERROR";
export const renameCollectionError = (error) => {
	return {
		type: RENAME_COLLECTION_ERROR,
		loading: false,
		error: error
	}
}

export const DELETE_FROM_COLLECTION_REQUEST = "DELETE_FROM_COLLECTION_REQUEST";
export const deleteFromCollectionRequest = () => {
	return {
		type: DELETE_COLLECTION_REQUEST,
		loading: true,
		error: null
	}
}

export const DELETE_FROM_COLLECTION_SUCCESS = "DELETE_FROM_COLLECTION_SUCCESS";
export const deleteFromCollectionSuccess = (collectionId, article) => {
  return {
		type: DELETE_COLLECTION_SUCCESS,
		loading: false,
		collectionId,
		article
	}
}

export const DELETE_FROM_COLLECTION_ERROR = "DELETE_FROM_COLLECTION_ERROR";
export const deleteFromCollectionError = (error) => {
	return {
		type: DELETE_COLLECTION_ERROR,
		loading: false,
		error
	}
}

export const DELETE_COLLECTION_REQUEST = "DELETE_COLLECTION_REQUEST";
export const deleteCollectionRequest = () => {
	return {
		type: DELETE_COLLECTION_REQUEST,
		loading: true,
		error: null
	}
}

export const DELETE_COLLECTION_SUCCESS = "DELETE_COLLECTION_SUCCESS";
export const deleteCollectionSuccess = () => {
  return {
		type: DELETE_COLLECTION_SUCCESS,
		loading: false
	}
}

export const DELETE_COLLECTION_ERROR = "DELETE_COLLECTION_ERROR";
export const deleteCollectionError = (error) => {
	return {
		type: DELETE_COLLECTION_ERROR,
		loading: false,
		error
	}
}

export const fetchCollections = () => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	dispatch(fetchCollectionsRequest());
	fetch(`${API_BASE_URL}/collections`, {
		headers: {
			Authorization: `Bearer ${authToken}`,
			Accept: 'application/json'
		}
	})
	.then (res => {
		if(!res.ok) {
			console.log("There was an issue with your request. Please try again.")
		}
		return res.json();
	})
	.then(data => {
		console.log('here', data);
		dispatch(fetchCollectionsSuccess(data));
	})
	.catch(err => {
		dispatch(fetchCollectionsError(err))
	})
};

export const createCollection = (collectionName) => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	dispatch(createCollectionRequest());
	fetch(`${API_BASE_URL}/collections`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${authToken}`,
			'Content-Type': 'application/JSON'
		},
		body: JSON.stringify({
			collectionTitle: collectionName,
			collectionArticles: []
		})
	})
	.then (res => {
		if(!res.ok) {
			console.log("There was an issue with your request. Please try again.")
		}
		return res.json();
	})
	.then(data => {
		dispatch(createCollectionSuccess(data.collectionName));
		dispatch(fetchCollections());
	})
	.catch(err => {
		dispatch(createCollectionError());
	})
}

export const deleteCollection = (collectionId) => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	dispatch(deleteCollectionRequest());
	fetch(`${API_BASE_URL}/collections/${collectionId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	})
	.then (res => {
		if(!res.ok) {
			console.log("There was an issue with your request. Please try again.")
		}
		return res.status;
	})
	.then (() => {
		dispatch(deleteCollectionSuccess());
		dispatch(fetchCollections());
	})
	.catch(err => {
		console.log(err);
		dispatch(deleteCollectionError());
	})
}

export const createAndAddToCollection = (collectionName, article) => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	dispatch(createCollectionRequest());
	fetch(`${API_BASE_URL}/collections`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${authToken}`,
			'Content-Type': 'application/JSON',
		},
		body: JSON.stringify({
			collectionTitle: collectionName,
			collectionArticles: []
		})
	})
	.then (res => {
		if(!res.ok) {
			console.log("There was an issue with your request. Please try again.")
		}
		return res.json();
	})
	.then(data => {
		dispatch(createCollectionSuccess(data.collectionTitle));
		dispatch(addToCollection(data._id, article));
		dispatch(fetchCollections());
	})
	.catch(err => {
		dispatch(createCollectionError());
	})
}

export const addToCollection = (collectionId, article) => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	dispatch(addToCollectionRequest());
	fetch(`${API_BASE_URL}/collections/${collectionId}`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${authToken}`,
			'Content-Type': 'application/JSON',
		},
		body: JSON.stringify(article)
	})
	.then (res => {
		if(!res.ok) {
			console.log("There was an issue with your request. Please try again.")
		}
		return res.json();
	})
	.then(data => {
		dispatch(addToCollectionSuccess(data));
		dispatch(fetchCollections());
	})
	.catch(err => {
		dispatch(addToCollectionError(err));
	})
}

export const deleteFromCollection = (collectionId, articleId) => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	dispatch(deleteFromCollectionRequest());
	fetch(`${API_BASE_URL}/collections/${collectionId}/${articleId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	})
	.then (res => {
		if(!res.ok) {
			console.log("There was an issue with your request. Please try again.")
		}
		return res.status;
	})
	.then(data => {
		dispatch(deleteFromCollectionSuccess(data));
		dispatch(fetchCollections());
	})
	.catch(err => {
		dispatch(deleteFromCollectionError(err));
	})
}

export const renameCollection = (collectionId, collectionName) => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	dispatch(renameCollectionRequest());
	fetch(`${API_BASE_URL}/collections/${collectionId}`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${authToken}`,
			'Content-Type': 'application/JSON'
		},
		body: JSON.stringify({
			id: collectionId,
			collectionTitle: collectionName
		})
	})
	.then (res => {
		if(!res.ok) {
			console.log("There was an issue with your request. Please try again.")
		}
		return res.status;
	})
	.then(data => {
		dispatch(renameCollectionSuccess());
		dispatch(fetchCollections());
	})
	.catch(err => {
		dispatch(renameCollectionError());
	})
}