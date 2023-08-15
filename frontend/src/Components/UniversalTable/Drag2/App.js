import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./App.css";

const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Walmart",
    // items: [
    //   { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "3% Milk" },
    //   { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "Butter" },
    // ],
    tint: 1,
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "Indigo",
    // items: [
    //   {
    //     id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
    //     name: "Designing Data Intensive Applications",
    //   },
    //   { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "Atomic Habits" },
    // ],
    tint: 2,
  }
];

function App(props) {
  const [stores, setStores] = useState(DATA)

  function getData(oldData){
    let newData = oldData.map(obj=>{
      obj['id'] = obj['key'];
      obj['name'] = obj['title'];
      delete obj['key'];
      delete obj['title'];
      return obj
    })
    // setStores(newData)
  }

  useEffect(()=>{
    getData(props.columns)
  },[])

  const handleDragAndDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...stores];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);
      return setStores(reorderedStores);
    }
    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const storeSourceIndex = stores.findIndex(
      (store) => store.id === source.droppableId
    );
    const storeDestinationIndex = stores.findIndex(
      (store) => store.id === destination.droppableId
    );

    const newSourceItems = [...stores[storeSourceIndex].items];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...stores[storeDestinationIndex].items]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newStores = [...stores];

    newStores[storeSourceIndex] = {
      ...stores[storeSourceIndex],
      items: newSourceItems,
    };
    newStores[storeDestinationIndex] = {
      ...stores[storeDestinationIndex],
      items: newDestinationItems,
    };
    setStores(newStores);
  };

  return (
    <div className={"body h-full"}>
      <div className="layout__wrapper relative">
        <div className="card">
          <button className={"bg-red-700 text-white absolute z-50 right-1 top-1 px-3 py-2 rounded-3xl"}>x</button>
          <div className={"mt-4"}>
            <DragDropContext onDragEnd={handleDragAndDrop}>
              <Droppable droppableId="ROOT" type="group">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {stores.map((store, index) => (
                          <Draggable
                              draggableId={store.id}
                              index={index}
                              key={store.id}
                          >
                            {(provided) => (
                                <div
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps}
                                    ref={provided.innerRef}
                                >
                                  <StoreList {...store} />
                                </div>
                            )}
                          </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoreList({ name, items, id }) {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className="store-container">
            <h3>{name}</h3>
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default App;
