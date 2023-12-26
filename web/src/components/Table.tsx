import { motion } from "framer-motion";

import { transition } from "lib/animation";

type TableProps = {
  data?: (number | string)[][];
  labels?: string[];
};

export function Table(props: TableProps) {
  const { data, labels } = props;

  return (
    <div className={containerClassName}>
      <div className={headerClassName}>
        {labels?.map((label, i) => (
          <div key={label} className={labelClassName}>
            {label}
          </div>
        ))}
      </div>
      <div className={bodyClassName}>
        {data?.map((items, i) => {
          return (
            <motion.div
              key={i}
              layoutScroll
              transition={transition.spring}
              className="w-full bg-white flex"
              animate={{ scale: [0, 1], opacity: [0, 1] }}
            >
              {items.map((item, i) => (
                <div key={`${item}-${i}`} className={colClassName}>
                  {item}
                </div>
              ))}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

const containerClassName =
  "w-full border-2 border-b-2 overflow-hidden  rounded-lg border-gray-700 text-sm text-left text-gray-800 ";
const headerClassName = "text-xs text-gray-700 uppercase bg-gray-50 flex";
const bodyClassName = "overflow-y-scroll max-h-96";
const colClassName = "px-6 py-2 w-1/3";
const labelClassName = "px-6 py-2 w-1/3";
