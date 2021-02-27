import Rail from "../../components/Rail/Rail";

const RailContainer: React.FC = () => {
    return (
        <div>
            <Rail minNodeSize={80} leftColWidth={200}></Rail>
            <Rail minNodeSize={80} leftColWidth={200}></Rail>
        </div>
    );
}

export default RailContainer;