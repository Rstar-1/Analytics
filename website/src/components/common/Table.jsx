import React, { useState, useMemo, useCallback } from "react";
import Pagination from "./Pagination";
import Icon from "./Icon";
import { resolveImagePath } from "../../utils/imageResolver";
import Image from "./Image";
import Skeleton from "./Skeleton";
import Button from "./Button";
import Fields from "../forms/Fields";
import { formatDate } from "../../utils/formatDate";
import Badge, { BadgeList, BADGE_MAP } from "./Badge";

const getNestedValue = (obj, path) => {
    if (!obj || !path) return undefined;
    if (obj[path] !== undefined) return obj[path];
    const val = path.split('.').reduce((curr, p) => (curr && typeof curr === 'object' ? curr[p] : undefined), obj);
    if (val !== undefined) return val;
    if (path === 'meta.title') return obj.meta_title || obj.title;
    if (path === 'meta.description') return obj.meta_description || obj.description;
    if (path === 'analytics.seoScore') return obj.seoScore || obj.score;
    return undefined;
};

export { formatDate, Badge, BadgeList, BADGE_MAP };

// Memoized Actions Subcomponent
const ActionButtons = React.memo(({ row, rowIdx, col, onEdit, onDelete, onView, actions, editTitle, deleteTitle, viewTitle }) => {
    const rowActions = col.actions || actions;
    if (Array.isArray(rowActions) && rowActions.length > 0) {
        return (
            <div className="flex items-center gap-8">
                {rowActions.map((act, i) => (
                    <Button
                        key={i}
                        type="button"
                        version="icon"
                        icon={act.icon}
                        bg={act.bg || "light-primary"}
                        color={act.color || "primary"}
                        onClick={() => act.onClick(row, rowIdx)}
                        title={act.title || ""}
                    />
                ))}
            </div>
        );
    }

    const editFn = col.onEdit || onEdit;
    const deleteFn = col.onDelete || onDelete;
    const viewFn = col.onView || onView;

    if (!editFn && !deleteFn && !viewFn) return null;

    return (
        <div className="flex items-center gap-8">
            {viewFn && (
                <Button
                    type="button"
                    version="icon"
                    icon="Eye"
                    bg="light-info"
                    color="info"
                    onClick={() => viewFn(row, rowIdx)}
                    title={col.viewTitle || viewTitle || "View"}
                />
            )}
            {editFn && (
                <Button
                    type="button"
                    version="icon"
                    icon="Edit"
                    bg="light-primary"
                    color="primary"
                    onClick={() => editFn(row, rowIdx)}
                    title={col.editTitle || editTitle || "Edit"}
                />
            )}
            {deleteFn && (
                <Button
                    type="button"
                    version="icon"
                    icon="Trash"
                    bg="light-danger"
                    color="danger"
                    onClick={() => deleteFn(row, rowIdx)}
                    title={col.deleteTitle || deleteTitle || "Delete"}
                />
            )}
        </div>
    );
});
ActionButtons.displayName = "ActionButtons";

// Memoized Profile Cell
const ProfileCell = React.memo(({ col, row }) => {
    const rawVal = getNestedValue(row, col.accessor);
    const obj = (rawVal && typeof rawVal === "object") ? rawVal : {};
    const name = obj.fullname || obj.name || obj.username || (typeof rawVal === "string" ? rawVal : "") || row[col.nameKey || "createdByName"] || row.username || row.name || "";
    const subText = obj.mobile || obj.phone || obj.email || obj.sub || row[col.subKey || "sub"] || row[col.emailKey || "email"] || row.email || row.sub || "";
    const rawImg = obj.image || obj.avatar || row[col.imageKey || "image"] || row.image || (Array.isArray(row.images) && row.images[0]) || row.avatar || "";
    const imgUrl = resolveImagePath(rawImg);
    const favColor = row[col.colorKey || "favoriteColor"] || "#6366f1";
    const imgStyle = { width: "40px", height: "40px", flexShrink: 0, ...col.imgStyle, ...col.imageStyle };

    return (
        <div className="flex items-center gap-12">
            {imgUrl ? (
                <Image src={imgUrl} alt={name} className="rounded-5 object-contain bg-forth p-2 border-tertiary" style={imgStyle} />
            ) : (
                <div style={{ background: favColor, width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0 }} className="center-div">
                    <p className="mini-text text-white font-600">
                        {name ? String(name).charAt(0).toUpperCase() : "?"}
                    </p>
                </div>
            )}
            <div>
                <h5 className="text-dark headmini-text font-500">{name}</h5>
                {subText && <p className="text-gray mini-text font-500">{subText}</p>}
            </div>
        </div>
    );
});
ProfileCell.displayName = "ProfileCell";

// Memoized Cell Renderer
const TableCell = React.memo(({
    col,
    row,
    rowIdx,
    isSelected,
    onToggleSelect,
    onEdit,
    onDelete,
    onView,
    actions,
    editTitle,
    deleteTitle,
    viewTitle
}) => {
    const rowId = row._id || row.id || rowIdx;
    const cellValue = col.accessor ? getNestedValue(row, col.accessor) : undefined;

    if (col.render) return col.render(row, rowIdx);

    // Form field types integrated with Fields.jsx
    if (col.accessor === "checkbox" || col.ui === "checkbox") {
        return (
            <Fields
                type="checkbox"
                value={isSelected}
                onChange={() => onToggleSelect?.(rowId, row)}
                wrapperClassName="flex items-center justify-center"
            />
        );
    }

    if (col.ui === "switch") {
        return (
            <Fields
                type="switch"
                value={Boolean(cellValue)}
                onChange={(val) => col.onChange?.(row, val, rowIdx)}
            />
        );
    }

    if (col.ui === "rating") {
        return (
            <Fields
                type="rating"
                value={Number(cellValue) || 0}
                onChange={(val) => col.onChange?.(row, val, rowIdx)}
                disabled={!col.onChange}
            />
        );
    }

    if (col.ui === "select") {
        return (
            <Fields
                type="select"
                value={cellValue}
                options={col.options || []}
                onChange={(val) => col.onChange?.(row, val, rowIdx)}
            />
        );
    }

    if (col.ui === "input" || col.ui === "editable") {
        return (
            <Fields
                type={col.inputType || "input"}
                value={cellValue || ""}
                placeholder={col.placeholder}
                onChange={(val) => col.onChange?.(row, val, rowIdx)}
            />
        );
    }

    // Date columns
    if (
        col.ui === "date" ||
        col.header === "Created" ||
        col.header === "Updated" ||
        col.accessor === "createdAt" ||
        col.accessor === "updatedAt" ||
        col.accessor === "createdDate" ||
        col.accessor === "updatedDate"
    ) {
        const rawDate = cellValue !== undefined && cellValue !== null && cellValue !== ""
            ? cellValue
            : (col.header === "Created" ? (row.createdAt || row.createdDate || row.date || "2026-08-09") : (row.updatedAt || row.updatedDate || row.lastActive || "2026-08-13"));
        return <p className="text-gray mini-text font-500" style={{ margin: 0 }}>{formatDate(rawDate, col.dateFormat || col.format) || "-"}</p>;
    }

    // Actions
    if ((col.accessor === "actions" || col.ui === "actions") && !React.isValidElement(cellValue)) {
        return (
            <ActionButtons
                row={row}
                rowIdx={rowIdx}
                col={col}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
                actions={actions}
                editTitle={editTitle}
                deleteTitle={deleteTitle}
                viewTitle={viewTitle}
            />
        );
    }

    // Formatted UI representations
    if (col.ui && !React.isValidElement(cellValue)) {
        switch (col.ui) {
            case "code":
                return (
                    <span className="font-mono text-primary mini-text px-8 py-2 rounded-4 font-500" style={{ background: "#eff6ff" }}>
                        {cellValue || "-"}
                    </span>
                );
            case "score-pill": {
                const score = Number(cellValue) || 0;
                const color = score >= 80 ? "#10b981" : score >= 50 ? "#f59e0b" : "#ef4444";
                const bg = score >= 80 ? "#ecfdf5" : score >= 50 ? "#fffbeb" : "#fef2f2";
                return (
                    <span className="mini-text font-600 px-8 py-4 rounded-20" style={{ background: bg, color, display: "inline-flex" }}>
                        {score ? `${score}%` : "-"}
                    </span>
                );
            }
            case "profile":
                return <ProfileCell col={col} row={row} />;
            case "badge-list":
            case "arr-badge":
                return (
                    <BadgeList
                        items={cellValue}
                        color={col.badgeColor || "primary"}
                        shape={col.badgeShape || "rounded"}
                        size="sm"
                    />
                );
            case "status": {
                const lower = String(cellValue || "").toLowerCase();
                const isActive = typeof cellValue === "boolean" ? cellValue : ["active", "approved", "published", "true"].includes(lower);
                const statusColor = isActive ? "#10b981" : "#ef4444";
                const displayLabel = cellValue && typeof cellValue === "string" ? cellValue : (isActive ? "Active" : "Inactive");
                return (
                    <Badge
                        variant="status"
                        dot={statusColor}
                        text={displayLabel}
                        textColor={isActive ? "var(--success, #10b981)" : "var(--danger, #ef4444)"}
                        className="small-text font-500"
                    />
                );
            }
            case "badge":
                return (
                    <Badge
                        text={cellValue}
                        bg={col.badgeBg}
                        textColor={col.badgeColor}
                        shape={col.badgeShape || "pill"}
                        size="sm"
                    />
                );
            case "icon-badge": {
                const valStr = String(cellValue || "").toLowerCase();
                const isPrivate = ["private", "protected", "closed"].includes(valStr);
                const isRating = col.accessor === "rating" || col.icon === "Star" || col.iconName === "Star";
                const iconName = col.icon || col.iconName || (isRating ? "Star" : isPrivate ? "Lock" : "Unlock");
                const defaultTheme = isRating ? "warning" : isPrivate ? "danger" : "primary";
                return (
                    <Badge
                        text={cellValue}
                        icon={iconName}
                        theme={defaultTheme}
                        bg={col.badgeBg}
                        textColor={col.badgeColor}
                        shape={col.badgeShape || "pill"}
                    />
                );
            }
            case "text":
            case "desc":
                return (
                    <p
                        className={`text-gray mini-text ${col.ui === "desc" ? "line-clamp1" : ""}`}
                        title={col.ui === "desc" ? (cellValue || "") : undefined}
                        style={{ margin: 0 }}
                    >
                        {cellValue || "-"}
                    </p>
                );
            default:
                break;
        }
    }

    return (
        <p className="text-gray mini-text" style={{ margin: 0 }}>
            {cellValue !== undefined && cellValue !== null && cellValue !== "" ? String(cellValue) : "-"}
        </p>
    );
});
TableCell.displayName = "TableCell";

// Memoized Collapsed Details View
const TableExpandedDetails = React.memo(({
    row,
    rowIdx,
    collapsedColumns,
    displayHeadersCount,
    actionProps,
}) => (
    <tr>
        <td colSpan={displayHeadersCount} className="">
            <div className="bg-white p-12" style={{ borderLeft: "4px solid var(--primary)" }}>
                <div className="grid-cols-4 gap-12">
                    {collapsedColumns.map((col, cIdx) => (
                        <div key={col.accessor || cIdx} className="p-12 rounded-5 border-ec">
                            <span className="mini-text text-gray font-600 uppercase block mb-6">{col.header}</span>
                            <div className="mini-text text-dark font-500">
                                <TableCell
                                    col={col}
                                    row={row}
                                    rowIdx={rowIdx}
                                    {...actionProps}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </td>
    </tr>
));
TableExpandedDetails.displayName = "TableExpandedDetails";

// Memoized Table Row Component
const TableRow = React.memo(({
    row,
    rowIdx,
    displayHeaders,
    collapsedColumns,
    isExpanded,
    onToggleExpand,
    isSelected,
    onToggleSelect,
    actionProps,
}) => {
    const rowId = row._id || row.id || rowIdx;

    return (
        <React.Fragment>
            <tr className={isExpanded ? "bg-light-primary-subtle" : ""}>
                {displayHeaders.map((col, colIdx) => {
                    if (col.accessor === "_expand") {
                        return (
                            <td key={colIdx} className="p-10 text-center bordb" style={{ verticalAlign: "middle" }}>
                                <button
                                    type="button"
                                    onClick={() => onToggleExpand(rowId)}
                                    className="p-6 rounded-5 border-0 bg-light text-primary hover:bg-primary hover:text-white cursor-pointer flex items-center justify-center"
                                    style={{ margin: "0 auto", transition: "all 0.2s ease", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                                    title={isExpanded ? "Collapse Details" : "Expand Details"}
                                >
                                    <Icon name="ChevronDown" width="14" height="14" strokeWidth="2.5" />
                                </button>
                            </td>
                        );
                    }

                    return (
                        <td
                            key={colIdx}
                            style={{ verticalAlign: "middle", ...col.style }}
                            className={`p-10 text-dark bordb ${col.className || ""}`}
                        >
                            <TableCell
                                col={col}
                                row={row}
                                rowIdx={rowIdx}
                                isSelected={isSelected}
                                onToggleSelect={onToggleSelect}
                                {...actionProps}
                            />
                        </td>
                    );
                })}
            </tr>
            {collapsedColumns.length > 0 && isExpanded && (
                <TableExpandedDetails
                    row={row}
                    rowIdx={rowIdx}
                    collapsedColumns={collapsedColumns}
                    displayHeadersCount={displayHeaders.length}
                    actionProps={actionProps}
                />
            )}
        </React.Fragment>
    );
});
TableRow.displayName = "TableRow";

// Memoized Table Header Component
const TableHeader = React.memo(({ displayHeaders, isAllSelected, onToggleSelectAll }) => (
    <thead>
        <tr>
            {displayHeaders.map((col, idx) => {
                const isCheckbox = col.accessor === "checkbox" || col.ui === "checkbox";
                return (
                    <th
                        key={idx}
                        style={col.style}
                        className={`bg-primary p-10 capitalize ${col.className || ""}`}
                    >
                        {isCheckbox ? (
                            <Fields
                                type="checkbox"
                                value={isAllSelected}
                                onChange={onToggleSelectAll}
                                wrapperClassName="flex items-center justify-center"
                            />
                        ) : (
                            <p className={`mini-text text-white font-500 ${col.className?.includes("text-center") ? "text-center" : col.className?.includes("text-right") ? "text-right" : "text-left"}`}>
                                {col.header}
                            </p>
                        )}
                    </th>
                );
            })}
        </tr>
    </thead>
));
TableHeader.displayName = "TableHeader";

const Table = ({
    title,
    subtitle,
    headerSub,
    data = [],
    columns = [],
    totalItems = 0,
    itemsPerPage = 10,
    page = 1,
    onPageChange,
    searchQuery = "",
    onSearchChange,
    searchPlaceholder = "Search...",
    showControls = true,
    itemName = "items",
    loading = false,
    collapsible = false,
    maxVisibleColumns = 5,
    minWidth = "1100px",
    onEdit,
    onDelete,
    onView,
    actions,
    editTitle,
    deleteTitle,
    viewTitle,
    selectedRows,
    onSelectRow,
    onSelectAll,
}) => {
    const [expandedRowId, setExpandedRowId] = useState(null);
    const [internalSelectedRowIds, setInternalSelectedRowIds] = useState(() => new Set());

    const toggleRow = useCallback((id) => {
        setExpandedRowId((prev) => (prev === id ? null : id));
    }, []);

    const subText = subtitle || headerSub;

    // Check if collapsing is active
    const hasExplicitCollapsed = useMemo(() => columns.some((col) => col.collapsed !== undefined), [columns]);
    const shouldCollapse = collapsible || hasExplicitCollapsed || (columns.filter(c => c.accessor !== "checkbox" && c.accessor !== "actions").length > maxVisibleColumns && collapsible !== false);

    const [displayHeaders, collapsedColumns] = useMemo(() => {
        let main = columns;
        let collapsed = [];
        if (shouldCollapse) {
            if (hasExplicitCollapsed) {
                main = columns.filter(c => !c.collapsed);
                collapsed = columns.filter(c => c.collapsed);
            } else {
                const chk = columns.find((c) => c.accessor === "checkbox" || c.ui === "checkbox");
                const acts = columns.find((c) => c.accessor === "actions" || c.ui === "actions");
                const dataCols = columns.filter((c) => c !== chk && c !== acts);
                main = [
                    ...(chk ? [chk] : []),
                    ...dataCols.slice(0, maxVisibleColumns),
                    ...(acts ? [acts] : [])
                ];
                collapsed = dataCols.slice(maxVisibleColumns);
            }
        }
        if (collapsed.length > 0) {
            const actionsIdx = main.findIndex(c => c.accessor === "actions" || c.ui === "actions");
            const expandCol = { header: "Details", accessor: "_expand", style: { width: "70px" }, className: "text-center" };
            main = [...main];
            if (actionsIdx !== -1) {
                main.splice(actionsIdx, 0, expandCol);
            } else {
                main.push(expandCol);
            }
        }
        return [main, collapsed];
    }, [columns, shouldCollapse, hasExplicitCollapsed, maxVisibleColumns]);

    // Checkbox selection handlers
    const isRowSelected = useCallback((rowId, row) => {
        if (selectedRows !== undefined) {
            return Array.isArray(selectedRows) ? selectedRows.includes(rowId) : Boolean(selectedRows?.has?.(rowId));
        }
        return internalSelectedRowIds.has(rowId) || Boolean(row?.checked || row?.isSelected);
    }, [selectedRows, internalSelectedRowIds]);

    const handleSelectRow = useCallback((rowId, row) => {
        if (onSelectRow) {
            onSelectRow(rowId, row);
        } else {
            setInternalSelectedRowIds((prev) => {
                const next = new Set(prev);
                if (next.has(rowId)) next.delete(rowId);
                else next.add(rowId);
                return next;
            });
        }
    }, [onSelectRow]);

    const isAllSelected = useMemo(() => {
        if (!data.length) return false;
        return data.every((row, idx) => isRowSelected(row._id || row.id || idx, row));
    }, [data, isRowSelected]);

    const handleSelectAll = useCallback(() => {
        if (onSelectAll) {
            onSelectAll();
        } else {
            setInternalSelectedRowIds((prev) => {
                if (prev.size >= data.length) return new Set();
                return new Set(data.map((r, i) => r._id || r.id || i));
            });
        }
    }, [data, onSelectAll]);

    const handleSearch = useCallback((val) => {
        if (!onSearchChange) return;
        onSearchChange(typeof val === "string" ? val : val?.target?.value ?? "");
    }, [onSearchChange]);

    const actionProps = useMemo(() => ({
        onEdit,
        onDelete,
        onView,
        actions,
        editTitle,
        deleteTitle,
        viewTitle
    }), [onEdit, onDelete, onView, actions, editTitle, deleteTitle, viewTitle]);

    return (
        <>
            <style>{`
                @media (max-width: 768px) {
                    .responsive-table-el {
                        min-width: max-content !important;
                    }
                    .responsive-table-el th,
                    .responsive-table-el td {
                        white-space: nowrap !important;
                    }
                }
            `}</style>
            {(title || (showControls && onSearchChange)) && (
                <div className="flex items-center justify-between mb-8">
                    {title ? (
                        <div className="w-70">
                            <h2 className="headmini-text text-dark font-500">{title}</h2>
                            {subText && <p className="text-gray font-400 mini-text">{subText}</p>}
                        </div>
                    ) : <div />}
                    {showControls && onSearchChange && (
                        <div className="w-30">
                            <Fields
                                type="input"
                                icon="Search"
                                iconPosition="right"
                                placeholder={searchPlaceholder}
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                    )}
                </div>
            )}

            {loading ? (
                <Skeleton variant="table" columns={displayHeaders} count={5} style={{ marginTop: "12px" }} minWidth={minWidth} />
            ) : (
                <div className="table-w rounded-5 mt-12 bordl bordr" style={{ overflowX: "auto" }}>
                    <table className="w-full responsive-table-el" style={{ borderCollapse: "collapse", minWidth }}>
                        <TableHeader
                            displayHeaders={displayHeaders}
                            isAllSelected={isAllSelected}
                            onToggleSelectAll={handleSelectAll}
                        />
                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={displayHeaders.length}>
                                        <div className="py-40 text-center bordb">
                                            <p className="head-text text-gray">🔍</p>
                                            <p className="text-gray small-text mt-7">No data found .</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                data.map((row, rowIdx) => {
                                    const rowId = row._id || row.id || rowIdx;
                                    return (
                                        <TableRow
                                            key={rowId}
                                            row={row}
                                            rowIdx={rowIdx}
                                            displayHeaders={displayHeaders}
                                            collapsedColumns={collapsedColumns}
                                            isExpanded={expandedRowId === rowId}
                                            onToggleExpand={toggleRow}
                                            isSelected={isRowSelected(rowId, row)}
                                            onToggleSelect={handleSelectRow}
                                            actionProps={actionProps}
                                        />
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {onPageChange && totalItems > itemsPerPage && (
                <Pagination
                    page={page}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={onPageChange}
                    itemName={itemName}
                />
            )}
        </>
    );
};

export default React.memo(Table);